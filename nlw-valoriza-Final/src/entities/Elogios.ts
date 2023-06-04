import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm"
import { v4 as uuid} from 'uuid'
import { Tag } from "./Tag"
import { User } from "./User"

@Entity("compliments")
class Elogio{

    @PrimaryColumn()
    readonly id:string

    @Column()
    user_sender: string;

    @JoinColumn({name: 'user_sender'})
    @ManyToOne(() => User)
    userSender: User

    @Column()
    user_receiver: string

    @JoinColumn({name: 'user_receiver'})
    @ManyToOne(() => User)
    userReceiver: User

    @Column()
    tag_id: string

    @JoinColumn({name: 'tag_id'}) //fazer o relacionamento, dessa forma a gente recebe a Tag com todas as infos e não somente o tag_id
    @ManyToOne(() => Tag)
    tag: Tag; 

    @Column()
    message: string

    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export {Elogio}