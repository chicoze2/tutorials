import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1625613198096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { //metodo up => Cirar a tabela seguindo os paramentros passados
        await queryRunner.createTable(
            new Table({

                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "admin",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> { //metodo down => Para remover a tabela caso nescessario
        //await queryRunner.dropTable('users')
    }

}
