'use client';

import { useState, useEffect } from 'react';
import {
  MessageSquare,
  User,
  Calendar,
  Tag,
  ThumbsUp,
  ThumbsDown,
  Meh,
  Filter,
  Search,
  Download,
  Eye,
} from 'lucide-react';

interface Conversation {
  id: string;
  sessionId: string;
  userId: string | null;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  category: 'lead' | 'networking' | 'curious' | null;
  sentiment: 'positive' | 'neutral' | 'negative' | null;
  createdAt: string;
  updatedAt: string;
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'lead' | 'networking' | 'curious'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      // TODO: Implement API endpoint for conversations
      // Placeholder data for now
      setConversations([
        {
          id: '1',
          sessionId: 'session_abc123',
          userId: null,
          messages: [
            {
              role: 'user',
              content: 'Hi, I'm interested in product management consulting',
              timestamp: '2024-01-20T10:00:00Z',
            },
            {
              role: 'assistant',
              content: 'Great! I'd love to help. What specific challenges are you facing?',
              timestamp: '2024-01-20T10:00:05Z',
            },
            {
              role: 'user',
              content: 'We're struggling with prioritization and stakeholder alignment',
              timestamp: '2024-01-20T10:01:00Z',
            },
          ],
          category: 'lead',
          sentiment: 'positive',
          createdAt: '2024-01-20T10:00:00Z',
          updatedAt: '2024-01-20T10:01:00Z',
        },
        {
          id: '2',
          sessionId: 'session_def456',
          userId: null,
          messages: [
            {
              role: 'user',
              content: 'How did you transition from developer to PM?',
              timestamp: '2024-01-19T15:30:00Z',
            },
            {
              role: 'assistant',
              content: 'It was a gradual process over several years...',
              timestamp: '2024-01-19T15:30:05Z',
            },
          ],
          category: 'curious',
          sentiment: 'neutral',
          createdAt: '2024-01-19T15:30:00Z',
          updatedAt: '2024-01-19T15:31:00Z',
        },
        {
          id: '3',
          sessionId: 'session_ghi789',
          userId: null,
          messages: [
            {
              role: 'user',
              content: 'I saw your article on product strategy',
              timestamp: '2024-01-18T09:00:00Z',
            },
            {
              role: 'assistant',
              content: 'Thank you! What did you think?',
              timestamp: '2024-01-18T09:00:05Z',
            },
          ],
          category: 'networking',
          sentiment: 'positive',
          createdAt: '2024-01-18T09:00:00Z',
          updatedAt: '2024-01-18T09:02:00Z',
        },
      ]);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter((conv) => {
    if (filter !== 'all' && conv.category !== filter) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return conv.messages.some((msg) =>
        msg.content.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const getSentimentIcon = (sentiment: string | null) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <ThumbsDown className="w-4 h-4 text-red-600" />;
      case 'neutral':
        return <Meh className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case 'lead':
        return 'bg-green-100 text-green-700 border-green-500';
      case 'networking':
        return 'bg-blue-100 text-blue-700 border-blue-500';
      case 'curious':
        return 'bg-purple-100 text-purple-700 border-purple-500';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-black mb-2">Conversations</h1>
          <p className="text-lg text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
            Manage chatbot interactions and leads
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white font-bold border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brutalist-text-light/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-12 pr-4 py-3 border-4 border-black rounded-brutal focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2">
          {['all', 'lead', 'networking', 'curious'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-4 py-2 font-bold rounded-brutal border-4 transition-all ${
                filter === f
                  ? 'bg-primary text-white border-black shadow-brutal'
                  : 'border-transparent hover:border-black'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-4">
          {loading ? (
            <div className="brutal-card p-8 text-center">
              <p className="text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                Loading conversations...
              </p>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="brutal-card p-8 text-center">
              <MessageSquare className="w-12 h-12 text-brutalist-text-light/40 mx-auto mb-4" />
              <p className="text-lg font-bold mb-2">No conversations found</p>
              <p className="text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                {filter === 'all'
                  ? 'No conversations yet'
                  : `No ${filter} conversations`}
              </p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full text-left brutal-card p-4 hover:shadow-brutal-hover transition-all ${
                  selectedConversation?.id === conv.id ? 'ring-4 ring-primary' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {conv.category && (
                      <span
                        className={`px-2 py-1 text-xs font-bold border-2 rounded-brutal ${getCategoryColor(
                          conv.category
                        )}`}
                      >
                        {conv.category}
                      </span>
                    )}
                    {getSentimentIcon(conv.sentiment)}
                  </div>
                  <div className="text-xs text-brutalist-text-light/50 dark:text-brutalist-text-dark/50">
                    {new Date(conv.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-sm font-bold mb-2 line-clamp-2">
                  {conv.messages[0]?.content || 'No messages'}
                </p>

                <div className="flex items-center gap-4 text-xs text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {conv.messages.length} messages
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {conv.userId ? 'Registered' : 'Anonymous'}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail View */}
        <div className="lg:sticky lg:top-4 lg:h-fit">
          {selectedConversation ? (
            <div className="brutal-card p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedConversation.category && (
                      <span
                        className={`px-2 py-1 text-xs font-bold border-2 rounded-brutal ${getCategoryColor(
                          selectedConversation.category
                        )}`}
                      >
                        {selectedConversation.category}
                      </span>
                    )}
                    {getSentimentIcon(selectedConversation.sentiment)}
                  </div>
                  <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                    Session: {selectedConversation.sessionId.slice(0, 16)}...
                  </p>
                </div>
                <div className="text-right text-xs text-brutalist-text-light/50 dark:text-brutalist-text-dark/50">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(selectedConversation.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {selectedConversation.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-brutal border-4 ${
                      msg.role === 'user'
                        ? 'bg-primary/10 border-primary ml-4'
                        : 'bg-secondary/10 border-secondary mr-4'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold">
                        {msg.role === 'user' ? 'User' : 'Assistant'}
                      </span>
                      <span className="text-xs text-brutalist-text-light/50 dark:text-brutalist-text-dark/50">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-6 border-t-4 border-brutalist-text-light/10 flex gap-2">
                <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 font-bold border-4 border-green-500 rounded-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
                  Mark as Lead
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 font-bold border-4 border-blue-500 rounded-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
                  Follow Up
                </button>
              </div>
            </div>
          ) : (
            <div className="brutal-card p-12 text-center">
              <Eye className="w-12 h-12 text-brutalist-text-light/40 mx-auto mb-4" />
              <p className="text-lg font-bold mb-2">Select a conversation</p>
              <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                Click on any conversation to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
