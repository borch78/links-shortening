import { BaseEntity, Entity, Index, Column, PrimaryColumn } from 'typeorm';

@Entity('links')
export class Links extends BaseEntity {
  @PrimaryColumn('varchar', { length: 32 })
  @Index({ unique: true })
  hash!: string;

  @Column('varchar', {
    length: 8,
  })
  short!: string;

  @Column('varchar', {
    length: 512,
  })
  long!: string;

  @Column('int', {
    default: 0,
  })
  count!: number;

  public incrementCount() {
    ++this.count;
  }
}
