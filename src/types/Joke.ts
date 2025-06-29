export interface Joke {
    id: number;
    type: JokeType;
    setup: string;
    punchline: string;
    rating?: number;
}
export type JokeType = 'general' | 'programming' | 'dad' | 'knock-knock';
export type JokeFilter = JokeType | 'all';

 