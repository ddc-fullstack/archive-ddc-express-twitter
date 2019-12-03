export interface Profile {
    profileId  : string,
    profileActivationToken : string | null,
    profileAtHandle: string,
    profileAvatarUrl: string,
    profileEmail: string,
    profileHash: string,
    profilePhone: string
}