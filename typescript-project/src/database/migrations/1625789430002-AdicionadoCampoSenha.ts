import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AdicionadoCampoSenha1625789430002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn( //adicionar uma coluna
            "users",  //na tabela users
            new TableColumn({
                name: "password", //coluna password 
                type: "varchar", //tipo varchar
                isNullable: true //pode ser nulo o valor
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
