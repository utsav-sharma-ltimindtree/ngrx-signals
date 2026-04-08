export interface Question {
    readonly caption: [string, string] | [string, string, string];
    readonly answers: [string, string, string, string];
    readonly correctIndex: 0 | 1 | 2 | 3;
}