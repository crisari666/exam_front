import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  selectIsParticipantValidated, 
  selectCurrentParticipant,
  selectParticipantError,
  selectIsParticipantLoading,
  resetValidation 
} from '../participant-slice';
import { validateParticipantAccess } from '../../exam/examSlice';

export const useParticipantValidation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isParticipantValidated = useSelector(selectIsParticipantValidated);
  const currentParticipant = useSelector(selectCurrentParticipant);
  const participantError = useSelector(selectParticipantError);
  const isLoading = useSelector(selectIsParticipantLoading);

  useEffect(() => {
    if (isParticipantValidated && currentParticipant) {
      dispatch(validateParticipantAccess(true));
    } else {
      dispatch(validateParticipantAccess(false));
    }
  }, [isParticipantValidated, currentParticipant, dispatch]);

  const handleLogout = () => {
    dispatch(resetValidation());
    navigate('/');
  };

  const requireValidation = () => {
    if (!isParticipantValidated || !currentParticipant) {
      navigate('/');
      return false;
    }
    return true;
  };

  return {
    isParticipantValidated,
    currentParticipant,
    participantError,
    isLoading,
    handleLogout,
    requireValidation,
  };
};
