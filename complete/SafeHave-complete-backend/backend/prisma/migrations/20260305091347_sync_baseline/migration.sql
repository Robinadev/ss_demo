/*
  Warnings:

  - You are about to drop the `_CaseAssignmentToServiceProvider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ForumComment" DROP CONSTRAINT "ForumComment_postId_fkey";

-- DropForeignKey
ALTER TABLE "_CaseAssignmentToServiceProvider" DROP CONSTRAINT "_CaseAssignmentToServiceProvider_A_fkey";

-- DropForeignKey
ALTER TABLE "_CaseAssignmentToServiceProvider" DROP CONSTRAINT "_CaseAssignmentToServiceProvider_B_fkey";

-- AlterTable
ALTER TABLE "ServiceProvider" ALTER COLUMN "specializations" DROP DEFAULT;

-- DropTable
DROP TABLE "_CaseAssignmentToServiceProvider";

-- CreateTable
CREATE TABLE "_supportProviders" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_supportProviders_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_supportProviders_B_index" ON "_supportProviders"("B");

-- CreateIndex
CREATE INDEX "Report_ipHash_idx" ON "Report"("ipHash");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- AddForeignKey
ALTER TABLE "ForumComment" ADD CONSTRAINT "ForumComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ForumPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_supportProviders" ADD CONSTRAINT "_supportProviders_A_fkey" FOREIGN KEY ("A") REFERENCES "CaseAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_supportProviders" ADD CONSTRAINT "_supportProviders_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
