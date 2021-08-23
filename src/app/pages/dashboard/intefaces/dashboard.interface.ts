export interface IRerservas {
    id: string;
    kids: number;
    into: Date;
    out: Date;
    user:string;
    create: Date;
    completed_at?: Date;
    cangu?: string;
}