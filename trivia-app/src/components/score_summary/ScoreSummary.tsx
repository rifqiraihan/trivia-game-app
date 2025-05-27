import { Box, Typography, Button } from '@mui/material';
import { IScoreProps } from './interfaces';

export default function ScoreSummary({ score, total, onRestart }: IScoreProps) {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Quiz Finished!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your Score: {score} / {total}
      </Typography>
      <Button variant="contained" size="large" onClick={onRestart}>
        Play Again
      </Button>
    </Box>
  );
}
