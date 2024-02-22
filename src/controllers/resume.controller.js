import resumeService from '../services/resume.service.js';

class ResumeController {
    findAllResumes = async (req, res) => {
        console.log('resume worked!');
        try {
            const orderKey = req.query.orderKey || 'resumeId';
            const orderValue = req.query.orderValue || 'desc';

            if (!['resumeId', 'status'].includes(orderKey)) {
                return res.status(400).json({ success: false, message: 'orderKey is not available.' });
            }

            if (!['asc', 'desc'].includes(orderValue.toLowerCase())) {
                return res.status(400).json({ success: false, message: 'orderValue is not available.' });
            }

            const resumes = await resumeService.findAllSortedResumes({ orderKey, orderValue: orderValue.toLowerCase() });

            return res.json({ data: resumes });
        } catch (err) {
            return res.status(err.code).json(err);
        }
    };

    findOneResume = async (req, res) => {
        try {
            const resumeId = req.params.summaryId;
            if (!resumeId) {
                return res.status(400).json({ success: false, message: 'resumeId is not available.' });
            }

            const resume = await resumeService.findOneResumeByResumeId(resumeId);

            if (!resume) {
                return res.json({ data: {} });
            }

            return res.json({ data: resume });
        } catch (err) {
            return res.status(err.code).json(err);
        }
    };

    createResume = async (req, res) => {
        try {
            const user = res.locals.user;
            const { title, content } = req.body;
            if (!title) {
                return res.status(400).json({ success: false, message: "Title is required." });
            }

            if (!content) {
                return res.status(400).json({ success: false, message: "Content is required." });
            }

            await resumeService.createResume({ title, content, userId: user.userId });

            return res.status(201).end();
        } catch (err) {
            return res.status(err.code).json(err);
        }
    };

    updateResume = async (req, res) => {
        try {
            const user = res.locals.user;
            const resumeId = req.params.summaryId;
            const { title, content, status } = req.body;

            if (!resumeId) {
                return res.status(400).json({ success: false, message: 'resumeId not available' });
            }

            if (!title || !content || !status) {
                return res.status(400).json({ success: false, message: "Title, content, and status are required." });
            }

            if (!['APPLY', 'DROP', 'PASS', 'INTERVIEW1', 'INTERVIEW2', 'FINAL_PASS'].includes(status)) {
                return res.status(400).json({ success: false, message: "Invalid status value." });
            }

            await resumeService.updateResumeByResumeId(resumeId, { title, content, status }, user);

            return res.status(201).end();
        } catch (err) {
            return res.status(err.code).json(err);
        }
    };

    deleteResume = async (req, res) => {
        try {
            const user = res.locals.user;
            const resumeId = req.params.summaryId;

            if (!resumeId) {
                return res.status(400).json({ success: false, message: 'resumeId not available' });
            }

            await resumeService.deleteResumeByResumeId(resumeId, user);

            return res.status(201).end();
        } catch (err) {
            return res.status(err.code).json(err);
        }
    };
}

const resumeController = new ResumeController();
export default resumeController;