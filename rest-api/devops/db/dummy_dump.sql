CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_TAG" PRIMARY KEY ("id"));   
CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_CARD" PRIMARY KEY ("id"));
CREATE TABLE "card_tags_tag" ("cardId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_CARD_TAG" PRIMARY KEY ("cardId", "tagId"), CONSTRAINT "FK_CARD" FOREIGN KEY ("cardId") REFERENCES "card"("id") on DELETE CASCADE ON UPDATE cascade, CONSTRAINT "FK_TAG" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE cascade) ;
CREATE INDEX "IDX_CARD" ON "card_tags_tag" ("cardId") ;
CREATE INDEX "IDX_TAG" ON "card_tags_tag" ("tagId") ;