import { connect } from '../database';

export async function getProfileByProfileEmail (profileEmail: string) {
  try {
    const mysqlConnection = await connect();

    const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(profileId) as profileId, profileActivationToken, profileAtHandle, profileAvatarUrl, profileEmail, profileHash, profilePhone FROM profile WHERE profileEmail = :profileEmail', { profileEmail });
    return rows;
  } catch (error) {
    console.log(error);
  }
}
