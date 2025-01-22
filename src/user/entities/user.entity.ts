import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    name: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 3 })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 3 })
    updatedAt: Date;
}
