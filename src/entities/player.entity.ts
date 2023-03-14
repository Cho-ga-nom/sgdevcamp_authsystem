import { Column,
	Entity,
	Index,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';

@Entity('player')
@Index(['email'])
export class Player {
  @PrimaryColumn({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @UpdateDateColumn()
  updateAt: Date;
}
