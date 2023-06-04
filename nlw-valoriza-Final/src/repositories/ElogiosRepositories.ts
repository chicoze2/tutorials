import {Repository, EntityRepository} from 'typeorm'
import { Elogio } from '../entities/Elogios'

@EntityRepository(Elogio)
class ElogiosRepositories extends Repository <Elogio>{}

export { ElogiosRepositories}