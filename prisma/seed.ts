/**
 * Database seed script
 * Populates the database with sample data for development
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create test user
  const user = await prisma.user.upsert({
    where: { email: 'mattia@example.com' },
    update: {},
    create: {
      email: 'mattia@example.com',
      name: 'Mattia Test',
      preferences: JSON.stringify({
        theme: 'light',
        language: 'en',
        notifications: true,
      }),
    },
  });
  console.log('Created user:', user.email);

  // Create sample blog posts
  const blogPosts = [
    {
      title: 'How neobrutalism taught me visual honesty',
      slug: 'neobrutalism-visual-honesty',
      content: `# Why neobrutalism matters

I've spent years designing interfaces that looked "professional" but felt dishonest. Neobrutalism changed that.

The thick borders, hard shadows, and bold colors aren't just aesthetic choices. They're a commitment to transparency. What you see is what you get.

No subtle gradients hiding poor hierarchy. No smooth animations masking slow performance. Just honest, functional design that respects the user's intelligence.`,
      excerpt: 'How embracing raw design principles led to more honest user experiences',
      category: 'Design',
      locale: 'en',
      readingTime: 5,
      published: true,
      publishedAt: new Date('2024-10-15'),
      metadata: JSON.stringify({
        tags: ['design', 'neobrutalism', 'ui'],
        seo: {
          title: 'Neobrutalism and Visual Honesty',
          description: 'Why raw design leads to better user experiences',
        },
      }),
    },
    {
      title: 'Why I stopped optimizing and started shipping',
      slug: 'stop-optimizing-start-shipping',
      content: `# The optimization trap

Three months. That's how long I spent optimizing a feature that took users 2 seconds to use.

The math didn't make sense. I was spending 90 days to save users 200 milliseconds they'd never notice.

Now I follow a simple rule: ship first, optimize when it hurts. Not before.`,
      excerpt: 'The hard lesson about premature optimization and shipping velocity',
      category: 'Dev',
      locale: 'en',
      readingTime: 4,
      published: true,
      publishedAt: new Date('2024-10-20'),
      metadata: JSON.stringify({
        tags: ['development', 'shipping', 'optimization'],
        seo: {
          title: 'Stop Optimizing, Start Shipping',
          description: 'Why shipping beats perfection every time',
        },
      }),
    },
    {
      title: 'OKRs that work vs OKRs that look good',
      slug: 'okrs-that-actually-work',
      content: `# The OKR theater

Most OKRs are performance art. They look impressive in slides but change nothing.

Real OKRs hurt. They force uncomfortable trade-offs. "Improve everything" isn't an OKR. "Reduce checkout time by 30% even if it means removing features" is.

The difference? One makes you popular. The other makes a difference.`,
      excerpt: 'How to write OKRs that drive real change instead of just looking impressive',
      category: 'Product',
      locale: 'en',
      readingTime: 6,
      published: true,
      publishedAt: new Date('2024-11-01'),
      metadata: JSON.stringify({
        tags: ['product', 'okr', 'strategy'],
        seo: {
          title: 'Writing Effective OKRs',
          description: 'OKRs that drive change vs OKRs that look good',
        },
      }),
    },
    {
      title: 'What nobody tells you about remote working',
      slug: 'remote-work-truth',
      content: `# The remote work illusion

Remote work is sold as freedom. It often becomes isolation.

The flexible schedule turns into always-on availability. The home office becomes a prison with better coffee.

I learned the hard way: remote work requires more discipline, not less. Clear boundaries, deliberate communication, and actual time off.

It's not about working from anywhere. It's about working sustainably from somewhere.`,
      excerpt: 'The uncomfortable truths about remote work that nobody mentions',
      category: 'Personal',
      locale: 'en',
      readingTime: 5,
      published: true,
      publishedAt: new Date('2024-11-02'),
      metadata: JSON.stringify({
        tags: ['remote', 'work', 'lifestyle'],
        seo: {
          title: 'Remote Work Reality Check',
          description: "What they don't tell you about working remotely",
        },
      }),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
    console.log('Created blog post:', post.title);
  }

  // Create sample chat conversation
  const conversation = await prisma.chatConversation.create({
    data: {
      userId: user.id,
      sessionId: 'dev-session-001',
      messages: JSON.stringify([
        {
          role: 'user',
          content: 'How do you balance product strategy with engineering constraints?',
          timestamp: new Date('2024-11-03T10:00:00Z').toISOString(),
        },
        {
          role: 'assistant',
          content: `I don't balance them. I merge them. That's the advantage of having written code myself.

When engineering says "impossible," I can ask better questions. Not "can you do it?" but "what would make it possible?" Usually it's a trade-off nobody wanted to discuss.

The secret? Start with the constraint, not the dream. Build from what's real, not what's ideal.`,
          timestamp: new Date('2024-11-03T10:00:30Z').toISOString(),
        },
      ]),
      category: 'networking',
      metadata: JSON.stringify({
        referrer: 'direct',
        device: 'desktop',
      }),
    },
  });
  console.log('Created sample conversation:', conversation.id);

  // Create sample calendar bookings
  const bookings = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1234567890',
      dateTime: new Date('2024-11-10T14:00:00Z'),
      duration: 60,
      type: 'consultation' as const,
      status: 'confirmed' as const,
      notes: 'Need help with product roadmap prioritization',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      dateTime: new Date('2024-11-12T10:00:00Z'),
      duration: 90,
      type: 'brainstorming' as const,
      status: 'pending' as const,
      notes: 'Exploring new product ideas for SaaS startup',
    },
  ];

  for (const booking of bookings) {
    await prisma.calendarBooking.create({
      data: booking,
    });
    console.log('Created booking for:', booking.name);
  }

  // Create sample analytics events
  const events = [
    {
      sessionId: 'session-001',
      eventType: 'page_view',
      eventName: 'homepage_viewed',
      page: '/',
      metadata: JSON.stringify({ viewport: '1920x1080' }),
    },
    {
      sessionId: 'session-001',
      eventType: 'button_click',
      eventName: 'hero_cta_clicked',
      page: '/',
      metadata: JSON.stringify({ button: 'Book a call' }),
    },
    {
      sessionId: 'session-002',
      eventType: 'page_view',
      eventName: 'blog_post_viewed',
      page: '/blog/neobrutalism-visual-honesty',
      metadata: JSON.stringify({ readingTime: 300 }),
    },
  ];

  for (const event of events) {
    await prisma.analyticsEvent.create({
      data: {
        ...event,
        userId: user.id,
      },
    });
  }
  console.log('Created analytics events:', events.length);

  // Create newsletter subscription
  await prisma.newsletterSubscription.upsert({
    where: { email: 'subscriber@example.com' },
    update: {},
    create: {
      email: 'subscriber@example.com',
      name: 'Newsletter Subscriber',
      status: 'active',
      source: 'homepage',
      preferences: JSON.stringify({
        frequency: 'weekly',
        topics: ['product', 'design'],
      }),
    },
  });
  console.log('Created newsletter subscription');

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
