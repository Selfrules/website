/**
 * Health Check Script
 * Monitors application health and external dependencies
 */

const https = require('https');
const http = require('http');

// Configuration
const CHECKS = {
  frontend: {
    name: 'Frontend',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    timeout: 5000,
  },
  backend: {
    name: 'Backend API',
    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/health',
    timeout: 5000,
  },
  database: {
    name: 'Database',
    check: async () => {
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      try {
        await prisma.$queryRaw`SELECT 1`;
        return { status: 'healthy' };
      } catch (error) {
        return { status: 'unhealthy', error: error.message };
      } finally {
        await prisma.$disconnect();
      }
    },
  },
};

// HTTP request helper
function checkUrl(url, timeout) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const startTime = Date.now();

    const request = protocol.get(url, { timeout }, (res) => {
      const responseTime = Date.now() - startTime;
      const status = res.statusCode;

      if (status >= 200 && status < 300) {
        resolve({
          status: 'healthy',
          responseTime,
          statusCode: status,
        });
      } else {
        resolve({
          status: 'unhealthy',
          responseTime,
          statusCode: status,
        });
      }
    });

    request.on('error', (error) => {
      resolve({
        status: 'unhealthy',
        error: error.message,
      });
    });

    request.on('timeout', () => {
      request.destroy();
      resolve({
        status: 'unhealthy',
        error: 'Request timeout',
      });
    });
  });
}

// Main health check
async function runHealthCheck() {
  console.log('🏥 Running health checks...\n');

  const results = {};
  let allHealthy = true;

  for (const [key, config] of Object.entries(CHECKS)) {
    try {
      let result;

      if (config.check) {
        result = await config.check();
      } else if (config.url) {
        result = await checkUrl(config.url, config.timeout);
      }

      results[key] = result;

      const statusEmoji = result.status === 'healthy' ? '✅' : '❌';
      console.log(`${statusEmoji} ${config.name}: ${result.status}`);

      if (result.responseTime) {
        console.log(`   Response time: ${result.responseTime}ms`);
      }

      if (result.error) {
        console.log(`   Error: ${result.error}`);
        allHealthy = false;
      }

      console.log('');
    } catch (error) {
      console.log(`❌ ${config.name}: unhealthy`);
      console.log(`   Error: ${error.message}\n`);
      results[key] = { status: 'unhealthy', error: error.message };
      allHealthy = false;
    }
  }

  // Summary
  console.log('─'.repeat(50));
  console.log(`Overall status: ${allHealthy ? '✅ HEALTHY' : '❌ UNHEALTHY'}`);
  console.log('─'.repeat(50));

  // Send webhook notification if configured
  if (process.env.WEBHOOK_URL && !allHealthy) {
    await sendNotification(results);
  }

  return allHealthy;
}

// Send notification
async function sendNotification(results) {
  const webhookUrl = process.env.WEBHOOK_URL;
  const unhealthyServices = Object.entries(results)
    .filter(([_, result]) => result.status === 'unhealthy')
    .map(([name, _]) => name);

  const payload = JSON.stringify({
    text: '⚠️ Health Check Alert',
    unhealthy_services: unhealthyServices,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });

  try {
    await new Promise((resolve, reject) => {
      const req = https.request(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': payload.length,
        },
      }, resolve);

      req.on('error', reject);
      req.write(payload);
      req.end();
    });

    console.log('📨 Alert notification sent');
  } catch (error) {
    console.error('Failed to send notification:', error.message);
  }
}

// Run if executed directly
if (require.main === module) {
  runHealthCheck()
    .then((healthy) => {
      process.exit(healthy ? 0 : 1);
    })
    .catch((error) => {
      console.error('Health check failed:', error);
      process.exit(1);
    });
}

module.exports = { runHealthCheck };
