export interface TaskProp {
    title: string;
    done: boolean;
}
declare const db: {
    read(filePath?: string): Promise<TaskProp[]>;
    write(data: TaskProp[], filePath?: string): Promise<unknown>;
};
export default db;
