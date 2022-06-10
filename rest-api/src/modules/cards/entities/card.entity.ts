import { Tag } from 'src/modules/tags/entities/tag.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('card')
export class Card {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    text: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Tag, { cascade: true, eager: true })
    @JoinTable()
    tags: Tag[];
}
