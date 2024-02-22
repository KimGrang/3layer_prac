export class ResumeRepository {
    constructor(prisma) {
        this.prisma = prisma;
    };

    findAllResumes = async () => {
        const resume = await prisma.resume.findMany();

        return resume;
    };

    findResumeById = async (postId) => {
        const post = await prisma.resume.findUnique({
            where: { resumeId: +resumeId },
        });

        return post;
    };

    createResume = async (nickname, password, title, content) => {
        const createdResume = await prisma.resume.create({
            data: {
                title,
                content,
                status: 'APPLY',
                userId: user.userId,
            },
        });

        return createdResume;
    };

    updateResume = async (postId, password, title, content) => {
        const updatedResume = await prisma.resume.update({
            where: {
                postId: +postId,
                password: password,
            },
            data: {
                title,
                content,
            },
        });

        return updatedResume;
    };

    deleteResume = async (postId, password) => {
        const deletedResume = await prisma.resume.delete({
            where: {
                postId: +postId,
                password: password,
            },
        });

        return deletedResume;
    };
}
