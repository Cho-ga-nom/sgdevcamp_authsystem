import { Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';

@Entity('user')
@Index(['email'])
export class User {
  @PrimaryColumn({ type: 'varchar' })
  email: string;

  @Column({ type: 'char', length: 10 })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @UpdateDateColumn()
  updateAt: Date;
}
