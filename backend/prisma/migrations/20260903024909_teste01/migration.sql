BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(320) NOT NULL,
    [password_hash] NVARCHAR(255) NOT NULL,
    [role] VARCHAR(20) NOT NULL CONSTRAINT [users_role_df] DEFAULT 'ADMIN',
    [created_at] DATETIME2 NOT NULL CONSTRAINT [users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[documents] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max),
    [status] VARCHAR(20) NOT NULL CONSTRAINT [documents_status_df] DEFAULT 'DRAFT',
    [public_token] VARCHAR(255) NOT NULL,
    [published_version_id] UNIQUEIDENTIFIER,
    [access_mode] VARCHAR(20) NOT NULL CONSTRAINT [documents_access_mode_df] DEFAULT 'PUBLIC',
    [created_by_id] UNIQUEIDENTIFIER,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [documents_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [documents_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [documents_public_token_key] UNIQUE NONCLUSTERED ([public_token])
);

-- CreateTable
CREATE TABLE [dbo].[document_versions] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [document_id] UNIQUEIDENTIFIER NOT NULL,
    [version_number] INT NOT NULL,
    [status] VARCHAR(20) NOT NULL CONSTRAINT [document_versions_status_df] DEFAULT 'DRAFT',
    [template] NVARCHAR(max) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [document_versions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [published_at] DATETIME2,
    CONSTRAINT [document_versions_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [document_versions_document_id_version_number_key] UNIQUE NONCLUSTERED ([document_id],[version_number])
);

-- CreateTable
CREATE TABLE [dbo].[document_pages] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [document_version_id] UNIQUEIDENTIFIER NOT NULL,
    [page_number] INT NOT NULL,
    [width] FLOAT(53) NOT NULL,
    [height] FLOAT(53) NOT NULL,
    [background_asset_id] UNIQUEIDENTIFIER,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [document_pages_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [document_pages_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[assets] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [storage_key] NVARCHAR(1000) NOT NULL,
    [original_name] NVARCHAR(255) NOT NULL,
    [mime_type] VARCHAR(255) NOT NULL,
    [size] INT NOT NULL,
    [url] NVARCHAR(2000),
    [document_id] UNIQUEIDENTIFIER,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [assets_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [assets_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[submissions] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [document_id] UNIQUEIDENTIFIER NOT NULL,
    [document_version_id] UNIQUEIDENTIFIER NOT NULL,
    [data] NVARCHAR(max) NOT NULL,
    [status] VARCHAR(20) NOT NULL CONSTRAINT [submissions_status_df] DEFAULT 'SUBMITTED',
    [generated_asset_id] UNIQUEIDENTIFIER,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [submissions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [submissions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [documents_status_idx] ON [dbo].[documents]([status]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [documents_public_token_idx] ON [dbo].[documents]([public_token]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [documents_deleted_at_idx] ON [dbo].[documents]([deleted_at]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [document_versions_document_id_idx] ON [dbo].[document_versions]([document_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [document_versions_status_idx] ON [dbo].[document_versions]([status]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [document_pages_document_version_id_idx] ON [dbo].[document_pages]([document_version_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [submissions_document_id_idx] ON [dbo].[submissions]([document_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [submissions_document_version_id_idx] ON [dbo].[submissions]([document_version_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [submissions_created_at_idx] ON [dbo].[submissions]([created_at]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [submissions_status_idx] ON [dbo].[submissions]([status]);

-- AddForeignKey
ALTER TABLE [dbo].[documents] ADD CONSTRAINT [documents_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[document_versions] ADD CONSTRAINT [document_versions_document_id_fkey] FOREIGN KEY ([document_id]) REFERENCES [dbo].[documents]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[document_pages] ADD CONSTRAINT [document_pages_document_version_id_fkey] FOREIGN KEY ([document_version_id]) REFERENCES [dbo].[document_versions]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[document_pages] ADD CONSTRAINT [document_pages_background_asset_id_fkey] FOREIGN KEY ([background_asset_id]) REFERENCES [dbo].[assets]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[assets] ADD CONSTRAINT [assets_document_id_fkey] FOREIGN KEY ([document_id]) REFERENCES [dbo].[documents]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[submissions] ADD CONSTRAINT [submissions_document_id_fkey] FOREIGN KEY ([document_id]) REFERENCES [dbo].[documents]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[submissions] ADD CONSTRAINT [submissions_document_version_id_fkey] FOREIGN KEY ([document_version_id]) REFERENCES [dbo].[document_versions]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[submissions] ADD CONSTRAINT [submissions_generated_asset_id_fkey] FOREIGN KEY ([generated_asset_id]) REFERENCES [dbo].[assets]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
