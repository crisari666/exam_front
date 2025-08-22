import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppHeader } from '../shared/components';
import { CodeValidationForm, ParticipantInfo } from '../features/participant/components';
import { RootState } from '../app/store';
import './Pages.css';

const HomePage: FC = () => {
  const { isCodeValidated } = useSelector((state: RootState) => state.participant);

  return (
    <div className="home-page">
      <AppHeader title="International English Language Exam" />
      
      <main>
        {isCodeValidated ? (
          <ParticipantInfo />
        ) : (
          <CodeValidationForm />
        )}
      </main>
    </div>
  );
};

export default HomePage;
