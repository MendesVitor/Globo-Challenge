import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CardsRepositoryProvide } from 'src/modules/cards/provide';
import { TagsService } from 'src/modules/tags/tags.service';
import { CardsService } from '../../../src/modules/cards/cards.service';
import { TagMock } from '../tags/tag.mock';
import { CardMock } from './card.mock';

describe('CardsService', () => {
    let service: CardsService;

    const fakeRepository = {
        create: jest.fn(),
        findByName: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        listByTag: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    const fakeTagsService = {
        findTagsById: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CardsService,
                { provide: TagsService, useValue: fakeTagsService },
                { provide: CardsRepositoryProvide, useValue: fakeRepository },
            ],
        }).compile();

        service = module.get<CardsService>(CardsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Cards service test', () => {
        it('should create a card', async () => {
            fakeTagsService.findTagsById.mockReturnValue([CardMock.tags[0]]);
            fakeRepository.create.mockReturnValue(CardMock);

            expect(
                await service.create({
                    text: CardMock.text,
                    tagsId: [CardMock.tags[0].id],
                }),
            ).toMatchObject(CardMock);
        });

        it('should find all cards', async () => {
            const cardArr = [CardMock, CardMock];

            fakeRepository.findAll.mockReturnValue(cardArr);

            expect(await service.findAll()).toMatchObject(cardArr);
        });

        it('should find cards by tag', async () => {
            fakeRepository.listByTag.mockReturnValue(CardMock);

            expect(await service.listByTag(TagMock.id)).toMatchObject(CardMock);
        });

        it('should find one card', async () => {
            fakeRepository.findOne.mockReturnValue(CardMock);

            expect(await service.findOne(CardMock.id)).toMatchObject(CardMock);
        });

        it('should throw error when card is not found', async () => {
            fakeRepository.findOne.mockReturnValue(null);

            expect(service.findOne(CardMock.id)).rejects.toThrowError(
                NotFoundException,
            );
        });

        it('should update card', async () => {
            fakeRepository.findOne.mockReturnValue(CardMock);

            expect(await service.update(CardMock.id, CardMock)).resolves;
        });

        it('should throw error when card to update is not found', async () => {
            fakeRepository.findOne.mockReturnValue(null);

            expect(service.update(CardMock.id, CardMock)).rejects.toThrowError(
                NotFoundException,
            );
        });

        it('should update card', async () => {
            fakeRepository.findOne.mockReturnValue(CardMock);

            expect(await service.remove(CardMock.id)).resolves;
        });

        it('should throw error when card to update is not found', async () => {
            fakeRepository.findOne.mockReturnValue(null);

            expect(service.remove(CardMock.id)).rejects.toThrowError(
                NotFoundException,
            );
        });
    });
});
