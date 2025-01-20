import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    name: string;

    @Column({ name: 'description', type: 'text'})
    description: string;

    @Column({ name: 'due_date', type: 'timestamp'})
    dueDate: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 3 })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 3 })
    updatedAt: Date;
}
