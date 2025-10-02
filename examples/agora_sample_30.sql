-- ============================
-- Agora Sample Data (20 examples, safe IDs)
-- ============================

-- Inquiries
INSERT INTO oc_agora_inquiries
(id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, access, anonymous, suggestions_expire, support_limit, show_results, admin_access, hide_booked_up, allow_comment, last_interaction, level, slug, parent_id, moderation_status)
VALUES
(1001, 'proposal', 'Ban Single-Use Plastics in Moorea', 'A proposal to reduce pollution by banning plastic bags and straws.', 6, 6, 'admin', UNIX_TIMESTAMP()-86400*200, 0, UNIX_TIMESTAMP()+86400*160, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*190, 0, 'proposal-1001', 0, 'collecting_support'),
(1002, 'debate', 'Tourism Limits in Bora Bora', 'Should Bora Bora cap the number of tourists each year?', 9, 11, 'moderator', UNIX_TIMESTAMP()-86400*150, 0, UNIX_TIMESTAMP()+86400*120, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*145, 0, 'debate-1002', 0, 'discussion_open'),
(1003, 'project', 'Community Solar Panels in Tahiti', 'Install solar panels for community centers across Tahiti.', 5, 5, 'test', UNIX_TIMESTAMP()-86400*100, 0, UNIX_TIMESTAMP()+86400*200, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*95, 0, 'project-1003', 0, 'under_process'),
(1004, 'petition', 'Protect Coral Reefs of Rangiroa', 'A petition to designate new marine protected areas in Rangiroa.', 15, 2, 'test2', UNIX_TIMESTAMP()-86400*80, 0, UNIX_TIMESTAMP()+86400*60, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*75, 0, 'petition-1004', 0, 'collecting_support'),
(1005, 'grievance', 'Noise Pollution from Airport in Tahiti', 'Residents complain about excessive airplane noise near Faa’a airport.', 5, 23, 'test3', UNIX_TIMESTAMP()-86400*60, 0, UNIX_TIMESTAMP()+86400*120, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*55, 0, 'grievance-1005', 0, 'under_investigation'),
(1006, 'suggestion', 'Add Recycling Bins Near Schools', 'A suggestion linked to grievance 1005 about environmental impact.', 5, 6, 'admin', UNIX_TIMESTAMP()-86400*55, 0, UNIX_TIMESTAMP()+86400*100, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*50, 0, 'suggestion-1006', 1005, 'under_process'),
(1007, 'proposal', 'Bike Lanes in Papeete', 'Proposal to create safe bicycle lanes in Papeete downtown.', 5, 9, 'moderator', UNIX_TIMESTAMP()-86400*40, 0, UNIX_TIMESTAMP()+86400*200, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*35, 0, 'proposal-1007', 0, 'collecting_support'),
(1008, 'official', 'Official Response: Bike Lanes', 'The municipality supports this proposal and will launch a feasibility study.', 5, 9, 'official', UNIX_TIMESTAMP()-86400*38, 0, UNIX_TIMESTAMP()+86400*120, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*37, 0, 'official-1008', 1007, 'integrated'),
(1009, 'project', 'Community Garden in Huahine', 'Create a shared garden to promote food security and social links.', 12, 17, 'test', UNIX_TIMESTAMP()-86400*30, 0, UNIX_TIMESTAMP()+86400*200, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*25, 0, 'project-1009', 0, 'feasibility_review'),
(1010, 'proposal', 'Vertical Farming in Raiatea', 'Introduce hydroponic vertical farms to save space and water.', 10, 4, 'test2', UNIX_TIMESTAMP()-86400*28, 0, UNIX_TIMESTAMP()+86400*150, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*25, 0, 'proposal-1010', 1009, 'under_process'),
(1011, 'grievance', 'Public Transport Delays', 'Citizens report frequent delays in Tahiti buses.', 5, 9, 'test3', UNIX_TIMESTAMP()-86400*27, 0, UNIX_TIMESTAMP()+86400*90, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*26, 0, 'grievance-1011', 1007, 'under_investigation'),
(1012, 'suggestion', 'Add GPS Tracking to Buses', 'Linked to grievance 1011, adding GPS tracking could reduce uncertainty.', 5, 9, 'admin', UNIX_TIMESTAMP()-86400*26, 0, UNIX_TIMESTAMP()+86400*100, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*25, 0, 'suggestion-1012', 1011, 'under_process'),
(1013, 'petition', 'Ban Jet Skis in Bora Bora Lagoon', 'Protect biodiversity by banning noisy jet skis.', 9, 3, 'moderator', UNIX_TIMESTAMP()-86400*24, 0, UNIX_TIMESTAMP()+86400*60, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*22, 0, 'petition-1013', 0, 'collecting_support'),
(1014, 'debate', 'Extend School Hours in Tahiti', 'Should schools end later to help working parents?', 5, 26, 'test', UNIX_TIMESTAMP()-86400*20, 0, UNIX_TIMESTAMP()+86400*90, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*18, 0, 'debate-1014', 0, 'discussion_open'),
(1015, 'proposal', 'Tree Planting Campaign in Moorea', 'Organize a campaign to plant 10,000 trees in Moorea.', 6, 2, 'test2', UNIX_TIMESTAMP()-86400*15, 0, UNIX_TIMESTAMP()+86400*200, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*14, 0, 'proposal-1015', 0, 'collecting_support'),
(1016, 'official', 'Official Response: Tree Planting', 'The Environment Office commits to supporting this campaign.', 6, 2, 'official', UNIX_TIMESTAMP()-86400*14, 0, UNIX_TIMESTAMP()+86400*120, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*13, 0, 'official-1016', 1015, 'integrated'),
(1017, 'grievance', 'Flooding in Paopao', 'Heavy rains cause recurrent floods in Paopao district.', 6, 10, 'test3', UNIX_TIMESTAMP()-86400*12, 0, UNIX_TIMESTAMP()+86400*100, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*11, 0, 'grievance-1017', 1003, 'under_process'),
(1018, 'suggestion', 'Build Better Drainage', 'Suggestion linked to grievance 1017: improve drainage system.', 6, 10, 'moderator', UNIX_TIMESTAMP()-86400*11, 0, UNIX_TIMESTAMP()+86400*90, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*10, 0, 'suggestion-1018', 1017, 'under_process'),
(1019, 'proposal', 'Green Roofs in Papeete', 'Encourage rooftop gardens for energy savings and urban cooling.', 5, 7, 'admin', UNIX_TIMESTAMP()-86400*8, 0, UNIX_TIMESTAMP()+86400*150, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*7, 0, 'proposal-1019', 0, 'collecting_support'),
(1020, 'debate', 'Should Schools Teach Tahitian Language?', 'Discussion on integrating Tahitian language into curriculum.', 5, 28, 'test2', UNIX_TIMESTAMP()-86400*5, 0, UNIX_TIMESTAMP()+86400*60, 0, 'public', 0, 0, 0, 'always', 0, 1, 1, UNIX_TIMESTAMP()-86400*4, 0, 'debate-1020', 0, 'discussion_open');

-- Comments
INSERT INTO oc_agora_comments (inquiry_id, user_id, comment, timestamp, deleted, confidential, recipient) VALUES
(1001, 'test2', 'This is much needed!', UNIX_TIMESTAMP()-86400*190, 0, 0, NULL),
(1001, 'test3', 'How will businesses adapt?', UNIX_TIMESTAMP()-86400*185, 0, 0, NULL),
(1002, 'admin', 'Tourism brings money but harms the environment.', UNIX_TIMESTAMP()-86400*145, 0, 0, NULL),
(1003, 'moderator', 'Good renewable initiative!', UNIX_TIMESTAMP()-86400*95, 0, 0, NULL),
(1005, 'test', 'I agree with this grievance.', UNIX_TIMESTAMP()-86400*55, 0, 0, NULL),
(1007, 'test2', 'This will reduce car traffic.', UNIX_TIMESTAMP()-86400*35, 0, 0, NULL),
(1009, 'test3', 'Community gardens build resilience.', UNIX_TIMESTAMP()-86400*25, 0, 0, NULL),
(1013, 'test', 'Biodiversity first!', UNIX_TIMESTAMP()-86400*22, 0, 0, NULL),
(1015, 'admin', 'Planting trees will also help soil erosion.', UNIX_TIMESTAMP()-86400*14, 0, 0, NULL);

-- Supports
INSERT INTO oc_agora_supports (inquiry_id, user_id, created) VALUES
(1001, 'test', UNIX_TIMESTAMP()-86400*190),
(1001, 'test2', UNIX_TIMESTAMP()-86400*189),
(1001, 'moderator', UNIX_TIMESTAMP()-86400*188),
(1002, 'test3', UNIX_TIMESTAMP()-86400*145),
(1003, 'admin', UNIX_TIMESTAMP()-86400*95),
(1003, 'test2', UNIX_TIMESTAMP()-86400*94),
(1004, 'moderator', UNIX_TIMESTAMP()-86400*75),
(1005, 'test2', UNIX_TIMESTAMP()-86400*55),
(1007, 'test3', UNIX_TIMESTAMP()-86400*35),
(1007, 'admin', UNIX_TIMESTAMP()-86400*34),
(1009, 'test2', UNIX_TIMESTAMP()-86400*25),
(1010, 'moderator', UNIX_TIMESTAMP()-86400*24),
(1013, 'test3', UNIX_TIMESTAMP()-86400*22),
(1015, 'admin', UNIX_TIMESTAMP()-86400*14),
(1015, 'test', UNIX_TIMESTAMP()-86400*13),
(1019, 'test3', UNIX_TIMESTAMP()-86400*7),
(1020, 'moderator', UNIX_TIMESTAMP()-86400*4);

