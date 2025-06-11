import React, { useState, useEffect } from 'react';

import GoalInput from './components/goals/GoalInput';
import CourseGoals from './components/goals/CourseGoals';
import ErrorAlert from './components/UI/ErrorAlert';

function App() {
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch('/api/goals');

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Fetching the goals failed.');
        }

        setLoadedGoals(resData.goals);
      } catch (err) {
        setError(
          err.message ||
            'Fetching goals failed - the server responsed with an error.'
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function addGoalHandler(goalText) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        body: JSON.stringify({
          text: goalText,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Adding the goal failed.');
      }

      setLoadedGoals((prevGoals) => {
        const updatedGoals = [
          {
            id: resData.goal.id,
            text: goalText,
          },
          ...prevGoals,
        ];
        return updatedGoals;
      });
    } catch (err) {
      setError(
        err.message ||
          'Adding a goal failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  async function deleteGoalHandler(goalId) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/goals' + goalId, {
        method: 'DELETE',
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Deleting the goal failed.');
      }

      setLoadedGoals((prevGoals) => {
        const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
        return updatedGoals;
      });
    } catch (err) {
      setError(
        err.message ||
          'Deleting the goal failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  // New function to test 3xx or 4xx endpoints
  async function testErrorEndpoint(endpoint) {
    setError(null);  // clear previous error
    setIsLoading(true);
    try {
      const response = await fetch(`/api/goals${endpoint}`);
      const resData = await response.json();

      if (!response.ok) {
        // Show server error message if any
        throw new Error(resData.message || `Request to /goals/${endpoint} failed.`);
      } else {
        // Show success or redirect message from server
        setError(`Response ${response.status}: ${resData.message || 'Success'}`);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  return (
    <div>
      {/* Buttons to test 3xx and 4xx */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          margin: '1.5rem 0',
        }}
      >
        <button
          onClick={() => testErrorEndpoint('300')}
          disabled={isLoading}
          style={{
            padding: '0.6rem 1.4rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '6px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 8px rgb(0 123 255 / 0.3)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#0056b3')}
          onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#007bff')}
        >
          Test 3xx Error
        </button>

        <button
          onClick={() => testErrorEndpoint('400')}
          disabled={isLoading}
          style={{
            padding: '0.6rem 1.4rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#fff',
            backgroundColor: '#dc3545',
            border: 'none',
            borderRadius: '6px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 8px rgb(220 53 69 / 0.3)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#a71d2a')}
          onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#dc3545')}
        >
          Test 4xx Error
        </button>
      </div>

      {error && <ErrorAlert errorText={error} />}
      <GoalInput onAddGoal={addGoalHandler} />
      {!isLoading && (
        <CourseGoals goals={loadedGoals} onDeleteGoal={deleteGoalHandler} />
      )}
    </div>
  );
}

export default App;
