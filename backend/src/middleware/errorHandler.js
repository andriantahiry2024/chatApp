const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Gestion des erreurs MongoDB
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: process.env.NODE_ENV === 'production' 
                ? 'Données invalides' 
                : err.message
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            message: 'Session invalide, veuillez vous reconnecter'
        });
    }

    // Erreur par défaut
    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === 'production' 
            ? 'Une erreur est survenue' 
            : err.message
    });
};

export default errorHandler;