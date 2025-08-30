"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [user, setUser] = useState(null); // Simple mock user for this example

  const SAMPLE_USER_ID = 1;

  useEffect(() => {
    // In a real app, you would use a proper authentication flow
    // For this assignment, we'll use a hardcoded user to demonstrate
    // the RSVP functionality.
    fetchEvent();
  }, [id]);

  async function fetchEvent() {
    setLoading(true);
    // Fetch a specific user from the Users table
    const { data: userData, error: userError } = await supabase
      .from("Users")
      .select(`id, name`)
      .eq("id", SAMPLE_USER_ID)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError.message);
      setLoading(false);
      return;
    }
    setUser(userData);

    // Fetch details of event from the Events table
    const { data, error } = await supabase
      .from('Events')
      .select('*, Users(name)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching event:', error);
    } else {
      setEvent(data);
      if (userData) {
        fetchRsvpStatus(data.id, userData.id);
      }
    }
    setLoading(false);
  }

  async function fetchRsvpStatus(eventId, userId) {
    console.log('Fetching RSVP status for:', { eventId, userId });
    const { data, error } = await supabase
      .from('RSVPs')
      .select('status')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single();

    console.log('RSVP fetch response:', { data, error });

    if (data) {
      setRsvpStatus(data.status);
    } else {
      setRsvpStatus(null);
    }
  }

  const handleRsvp = async (status) => {
    if (!user) {
      alert('You must be signed in to RSVP.');
      return;
    }

    const newRsvp = {
      user_id: user.id,
      event_id: id,
      status: status,
    };

    const { error } = await supabase.from('RSVPs').upsert(newRsvp, {
      onConflict: ['user_id', 'event_id'],
    });

    if (error) {
      console.error('Error updating RSVP:', error);
      alert('Failed to update RSVP. Please try again.');
    } else {
      setRsvpStatus(status);
      alert(`RSVP successfully changed to: ${status}`);
    }
  };

  if (loading || !event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading event details...</p>
      </div>
    );
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans antialiased">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <Link href="/">
          <div className="text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-6 font-medium">← Back to Events</div>
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{event.title}</h1>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold text-gray-800">When:</span> {formatDateTime(event.date)}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold text-gray-800">Where:</span> {event.city}
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold text-gray-800">Hosted by:</span> {event.Users?.name || 'Unknown'}
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">{event.description}</p>
        
        <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Your RSVP Status</h3>
          <p className="text-center text-gray-600 mb-4">
            Current Status: <span className="font-bold text-gray-900">{rsvpStatus || 'Not Set'}</span>
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleRsvp('Yes')}
              className={`py-3 px-6 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 duration-300 ${rsvpStatus === 'Yes' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
            >
              <span className="mr-2">✅</span>Yes
            </button>
            <button
              onClick={() => handleRsvp('Maybe')}
              className={`py-3 px-6 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 duration-300 ${rsvpStatus === 'Maybe' ? 'bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'}`}
            >
              <span className="mr-2">🤔</span>Maybe
            </button>
            <button
              onClick={() => handleRsvp('No')}
              className={`py-3 px-6 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 duration-300 ${rsvpStatus === 'No' ? 'bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}
            >
              <span className="mr-2">❌</span>No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
