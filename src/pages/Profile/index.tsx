import { Card, CardContent, Typography, Box, Avatar, Stack } from '@mui/material';
import { currentUser } from '../../data/user';

const Profile = () => {
  const { firstName, lastName, location, bio } = currentUser;

  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Card>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 64, height: 64, fontSize: 24 }}>{initials}</Avatar>
            <Box>
              <Typography variant="h6">
                {firstName} {lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {bio}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
