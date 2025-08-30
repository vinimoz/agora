CREATE TABLE `debate_arguments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `debate_id` INT NOT NULL,                       -- lien avec la contribution 'débat'
    `parent_id` INT DEFAULT NULL,                   -- si réponse à un autre argument
    `author_id` VARCHAR(64) NOT NULL,               -- user Nextcloud
    `argument_type` ENUM('pro', 'con', 'alternative') NOT NULL, -- classification
    `content` TEXT NOT NULL,                        -- texte de l’argument
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT `fk_debate_argument_debate`
        FOREIGN KEY (`debate_id`) REFERENCES `contributions`(`id`)
        ON DELETE CASCADE,

    CONSTRAINT `fk_debate_argument_parent`
        FOREIGN KEY (`parent_id`) REFERENCES `debate_arguments`(`id`)
        ON DELETE CASCADE
);


CREATE TABLE `debate_argument_reactions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `argument_id` INT NOT NULL,
    `user_id` VARCHAR(64) NOT NULL,
    `reaction` ENUM('like', 'dislike', 'thinking') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT `fk_reaction_argument`
        FOREIGN KEY (`argument_id`) REFERENCES `debate_arguments`(`id`)
        ON DELETE CASCADE
);


