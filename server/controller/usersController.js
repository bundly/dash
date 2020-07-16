const usersController = {
    getOne: (req, res, _) => {
        res.json({
            success: true,
            data: req.user
        });
    }
};

export default usersController;
