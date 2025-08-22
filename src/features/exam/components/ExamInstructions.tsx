import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Info,
  School,
  Timer,
  Security,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface ExamInstructionsProps {
  onStart: () => void;
}

const ExamInstructions: React.FC<ExamInstructionsProps> = ({ onStart }) => {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom align="center" color="primary">
          {isSpanish ? 'Examen Internacional de Inglés' : 'International English Language Exam'}
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {isSpanish 
              ? 'Bienvenido(a) al examen de validación de nivel de idiomas'
              : 'Welcome to the Language Proficiency Validation Exam'
            }
          </Typography>
          
          <Typography variant="body1" paragraph>
            {isSpanish
              ? 'A continuación, encontrarás un conjunto de 20 preguntas de opción múltiple diseñadas para evaluar tus conocimientos en comprensión lectora, gramática, vocabulario y uso del idioma.'
              : 'Below, you will find a set of 20 multiple-choice questions designed to assess your knowledge in reading comprehension, grammar, vocabulary, and overall language usage.'
            }
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle color="success" sx={{ mr: 1 }} />
            {isSpanish ? 'Instrucciones Generales:' : 'General Instructions:'}
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <School color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'Este examen se presenta en modalidad virtual y solo está permitido una vez por persona.'
                    : 'This exam is conducted entirely online and is limited to one attempt per participant.'
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'Para aprobar, deberás responder correctamente al menos 13 preguntas (65% de aciertos).'
                    : 'To pass, you must correctly answer at least 13 out of 20 questions (minimum score: 65%).'
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Timer color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'No hay límite de tiempo establecido, pero se recomienda completarlo en un máximo de 45 minutos.'
                    : 'There is no time limit, but it is strongly recommended to complete the exam within 45 minutes.'
                }
              />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Warning color="warning" sx={{ mr: 1 }} />
            {isSpanish ? 'Importante:' : 'Important Notes:'}
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <Security color="error" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'No se permite el uso de traductores, ayudas externas ni la asistencia de terceros.'
                    : 'The use of translation tools, external assistance, or third-party support is strictly prohibited.'
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Warning color="warning" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'No cierres ni actualices la página una vez iniciado el formulario.'
                    : 'Do not close or refresh the page once the exam has started.'
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'El sistema puede registrar tu correo, hora de envío y número de intentos (Solo se permite un intento).'
                    : 'The system may record your email address, submission time, and number of attempts (only one attempt is allowed).'
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Security color="error" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'En caso de detección de fraude, el examen será anulado inmediatamente.'
                    : 'Any indication of fraudulent behavior will result in the immediate invalidation of the exam.'
                }
              />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Info color="info" sx={{ mr: 1 }} />
            {isSpanish ? 'Recomendaciones antes de comenzar:' : 'Recommendations Before Starting:'}
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'Asegúrate de tener conexión a internet estable.'
                    : 'Ensure a stable internet connection throughout the exam.'
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'Elige un lugar tranquilo y sin distracciones.'
                    : 'Choose a quiet and distraction-free environment.'
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'Lee con atención cada pregunta antes de responder.'
                    : 'Read each question carefully before answering.'
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'Marca solo una respuesta por pregunta.'
                    : 'Select only one answer per question.'
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isSpanish
                    ? 'Al finalizar, asegúrate de hacer clic en el botón "Enviar" para registrar tus respuestas.'
                    : 'Upon completion, click the "Submit" button to register your responses.'
                }
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            {isSpanish
              ? 'Todas las preguntas están en inglés. Las instrucciones se muestran en ambos idiomas para tu comodidad.'
              : 'All questions are in English. Instructions are displayed in both languages for your convenience.'
            }
          </Typography>
        </Alert>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={onStart}
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            {isSpanish ? 'Comenzar Examen' : 'Start Exam'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ExamInstructions;
