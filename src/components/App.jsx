import { useState } from 'react';
import Statistics from 'components/Statistics';
import FeedbackOptions from 'components/FeedbackOptions';
import Section from 'components/Section';
import Notification from 'components/Notification';

const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const options = Object.keys(feedbacks);
  const { good, neutral, bad } = feedbacks;
  const total = good + neutral + bad;

  const leaveFeedback = name => {
    setFeedbacks(prevFeedbacks => {
      const value = prevFeedbacks[name];
      return { ...prevFeedbacks, [name]: value + 1 };
    });
  };

  const countPositiveFeedbackPercentage = () => {
    if (!total) {
      return 0;
    }
    return Math.round((good / total) * 100);
  };

  return (
    <div>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions options={options} onLeaveFeedback={leaveFeedback} />
      </Section>

      <Section title={'Statistics'}>
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification text={'There is no feedback'} />
        )}
      </Section>
    </div>
  );
};

export default App;
