import authService from "../services/auth.service.js";

class AuthController {
    async generateNewAccessTokenByFreshToken(req, res) {
        try {
            const { refreshToken } = req.body;

            const token = await authService.verifyFreshToken(refreshToken);
            return res.json(token);
        } catch (err) {
            return res.status(err.code).json(err);
        }
    }
}

const authController = new AuthController();
export default authController;