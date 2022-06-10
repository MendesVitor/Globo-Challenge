import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardsTypeormRepository } from 'src/modules/cards/data/cards.typeorm.repository';
import { Card } from 'src/modules/cards/entities/card.entity';
import { TagMock } from '../tags/tag.mock';
import { CardMock } from './card.mock';

describe('CardsService', () => {
    let repository: CardsTypeormRepository;

    const fakeRepository = {
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CardsTypeormRepository,
                { provide: getRepositoryToken(Card), useValue: fakeRepository },
            ],
        }).compile();

        repository = module.get<CardsTypeormRepository>(CardsTypeormRepository);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('Card repository tests', () => {
        it('should create a card', async () => {
            fakeRepository.save.mockReturnValue(CardMock);

            expect(
                await repository.create({
                    text: CardMock.text,
                    tagsId: [TagMock.id],
                }),
            ).toMatchObject(CardMock);
        });

        it('should find all cards', async () => {
            const cardArr = [CardMock, CardMock];

            fakeRepository.find.mockReturnValue(cardArr);

            expect(await repository.findAll()).toMatchObject(cardArr);
        });

        it('should find one card', async () => {
            fakeRepository.findOne.mockReturnValue(CardMock);

            expect(await repository.findOne(CardMock.id)).toMatchObject(
                CardMock,
            );
        });

        it('should list cards by tag', async () => {
            const cardArr = [CardMock, CardMock];

            fakeRepository.find.mockReturnValue(cardArr);

            expect(
                await repository.listByTag(CardMock.tags[0].id),
            ).toMatchObject(cardArr);
        });

        it('should update a card', async () => {
            repository.update(CardMock.id, {
                text: CardMock.text,
                tags: CardMock.tags,
            });
            expect(fakeRepository.save).toBeCalled();
        });

        it('should remove a remove', async () => {
            repository.remove(CardMock.id);
            expect(fakeRepository.delete).toBeCalled();
        });
    });
});
