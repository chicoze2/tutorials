import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateElogiosTable1625793082309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments", //nome da tabela
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_sender",
                        type: "uuid",
                        
                    },
                    {
                        name: "user_receiver",
                        type: "uuid"
                    },
                    {
                        name: "tag_id",
                        type: "uuid"
                    },
                    {
                        name: "message",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK-User-Sender-Id",
                        referencedTableName: "users", //tabela users
                        referencedColumnNames: ['id'], //coluna id
                        columnNames: ["user_sender"], // se referencia ao user_sender da tabela atual
                        onDelete: "SET NULL", //se o usuário for deletado
                        onUpdate: "SET NULL" //se o usuario for atualizado
                    
                    },
                    {
                        name: "FK-User-Reciever-Id",
                        referencedTableName: "users", //tabela users
                        referencedColumnNames: ['id'], //coluna id
                        columnNames: ["user_receiver"], // se referencia ao user_sender da tabela atual
                        onDelete: "SET NULL", //se o usuário for deletado
                        onUpdate: "SET NULL" //se o usuario for atualizado
                    
                    },
                    {
                        name: "FK-Tag-Tag-Id",
                        referencedTableName: "tags", //tabela users
                        referencedColumnNames: ['id'], //coluna id
                        columnNames: ["tag_id"], // se referencia ao user_sender da tabela atual
                        onDelete: "SET NULL", //se o usuário for deletado
                        onUpdate: "SET NULL" //se o usuario for atualizado
                    
                    }

                ]
            })
        )
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    
    }

}
