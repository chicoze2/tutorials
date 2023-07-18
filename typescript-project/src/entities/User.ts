import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid" //importar a versao 4 do uuid como uuid


@Entity("users")
class User {

    @PrimaryColumn()
    readonly id : string;

    @Column()
    name : string;

    @Column()
    email : string;

    @Column()
    password : string;

    @Column()
    admin: boolean;

    @CreateDateColumn()
    created_at : Date;

    @UpdateDateColumn()
    updated_at : Date;

    constructor() {
        if(!this.id) { //o this é usado para acessar os atributos de uma classe

            this.id = uuid() //quando o ususario nao tem id, é criado um uuid

        }
    }

}

export {User};