export interface MessageReceived {
    
    id: number;
    fromUsername: string;
    subject: string;
    body: string;
    dateCreated: string;
    lastUpdated: string;
    hasBeenRead: boolean;
}