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

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @UpdateDateColumn()
  updateAt: Date;
}
