import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagsTypeormRepository } from 'src/modules/tags/data/tags.typeorm.repository';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { TagMock } from './tag.mock';

describe('TagsRepository', () => {
    let repository: TagsTypeormRepository;

    const fakeRepository = {
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TagsTypeormRepository,
                { provide: getRepositoryToken(Tag), useValue: fakeRepository },
            ],
        }).compile();

        repository = module.get<TagsTypeormRepository>(TagsTypeormRepository);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('Tag repository tests', () => {
        it('should create a tag', async () => {
            fakeRepository.save.mockReturnValue(TagMock);

            expect(
                await repository.create({ name: TagMock.name }),
            ).toMatchObject(TagMock);
        });

        it('should findAll tags', async () => {
            const tagArr = [TagMock, TagMock];

            fakeRepository.find.mockReturnValue(tagArr);

            expect(await repository.findAll()).toMatchObject(tagArr);
        });

        it('should findOne tag', async () => {
            fakeRepository.findOne.mockReturnValue(TagMock);

            expect(await repository.findOne(TagMock.id)).toMatchObject(TagMock);
        });

        it('should update a tag', async () => {
            repository.update(TagMock.id, { name: TagMock.name });
            expect(fakeRepository.update).toBeCalled();
        });

        it('should remove a tag', async () => {
            repository.remove(TagMock.id);
            expect(fakeRepository.delete).toBeCalled();
        });

        it('should find tags by id', async () => {
            const tagArr = [TagMock, TagMock];

            fakeRepository.find.mockReturnValue(tagArr);

            expect(
                await repository.findTagsById([tagArr[0].id, tagArr[1].id]),
            ).toMatchObject([TagMock, TagMock]);
        });

        it('should find a tag by name', async () => {
            const tagArr = [TagMock, TagMock];

            fakeRepository.find.mockReturnValue(tagArr);

            expect(await repository.findByName(TagMock.name)).toMatchObject(
                TagMock,
            );
        });
    });
});
