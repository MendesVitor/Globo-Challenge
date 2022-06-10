import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TagsRepositoryProvide } from 'src/modules/tags/provide';
import { TagsService } from '../../../src/modules/tags/tags.service';
import { TagMock } from './tag.mock';

describe('TagsService', () => {
    let service: TagsService;
    const fakeRepository = {
        create: jest.fn(),
        findByName: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findTagsById: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TagsService,
                { provide: TagsRepositoryProvide, useValue: fakeRepository },
            ],
        }).compile();

        service = module.get<TagsService>(TagsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Tag service test', () => {
        it('should create a tag', async () => {
            fakeRepository.findByName.mockReturnValue(null);
            fakeRepository.create.mockReturnValue(TagMock);
            expect(await service.create(TagMock)).toMatchObject(TagMock);
        });

        it('should throw error if a tag with the name already exists', async () => {
            fakeRepository.findByName.mockReturnValue({});

            expect(service.create(TagMock)).rejects.toThrowError(
                ConflictException,
            );
        });

        it('should find all tags', async () => {
            const tagArr = [TagMock, TagMock];

            fakeRepository.findAll.mockReturnValue(tagArr);
            expect(await service.findAll()).toMatchObject(tagArr);
        });

        it('should find one tag', async () => {
            fakeRepository.findOne.mockReturnValue(TagMock);

            expect(await service.findOne(TagMock.id)).toMatchObject(TagMock);
        });

        it('should throw error if tag not found', async () => {
            fakeRepository.findOne.mockReturnValue(null);

            expect(service.findOne(TagMock.id)).rejects.toThrowError(
                NotFoundException,
            );
        });

        it('should find tags by id', async () => {
            const tagArr = [TagMock, TagMock];

            fakeRepository.findTagsById.mockReturnValue(tagArr);
            expect(
                await service.findTagsById([tagArr[0].id, tagArr[1].id]),
            ).toMatchObject(tagArr);
        });

        it('should update tag', async () => {
            fakeRepository.findByName.mockReturnValue(null);
            fakeRepository.findOne.mockReturnValue({});

            expect(await service.update(TagMock.id, { name: TagMock.name }))
                .resolves;
        });

        it('should throw error if a name in used is used to update a tag', async () => {
            fakeRepository.findByName.mockReturnValue({});

            expect(
                service.update(TagMock.id, { name: TagMock.name }),
            ).rejects.toThrowError(ConflictException);
        });

        it('should throw error if tag to update is not found', async () => {
            fakeRepository.findByName.mockReturnValue(null);
            fakeRepository.findOne.mockReturnValue(null);

            expect(
                service.update(TagMock.id, { name: TagMock.name }),
            ).rejects.toThrowError(NotFoundException);
        });

        it('should remove tag', async () => {
            fakeRepository.findOne.mockReturnValue(TagMock);

            expect(await service.remove(TagMock.id)).resolves;
        });

        it('should throw error if tag not found when removing', async () => {
            fakeRepository.findOne.mockReturnValue(null);

            expect(service.remove(TagMock.id)).rejects.toThrowError(
                NotFoundException,
            );
        });
    });
});
