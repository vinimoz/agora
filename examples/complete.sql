-- =======================================================
-- AGORA DEMO DATASET (Switzerland-style hierarchical groups)
-- Corrected with proper owner, family, and access values
-- Fixed: support_feature now uses strings ('none','binary','ternary')
-- Added: options and adjusted supports to reference them
-- =======================================================

-- ============================
-- Table: oc_agora_inq_group
-- ============================

INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit) VALUES
-- === National Programs (root level) ===
(1, NULL, UNIX_TIMESTAMP() - 86400*90, 0, 'Climate Action Program 2030', 'program', 'admin', 'National strategy for climate transition and CO2 reduction targets', 'Federal Climate Strategy', 'federal-government', UNIX_TIMESTAMP() + 86400*365*5, '{"budget": "5.2B CHF", "minister": "Simonetta Sommaruga"}', NULL, 1, 'active', 1),
(2, NULL, UNIX_TIMESTAMP() - 86400*60, 0, 'Digital Switzerland 2025-2030', 'program', 'admin', 'Modernization of digital public services and infrastructure', 'Digital Transformation', 'federal-government', UNIX_TIMESTAMP() + 86400*365*3, '{"budget": "1.8B CHF", "timeline": "2025-2030"}', NULL, 1, 'active', 1),
(31, NULL, UNIX_TIMESTAMP() - 86400*30, 0, 'Swiss Health Strategy 2030', 'program', 'admin', 'National public health framework and prevention strategy', 'Health 2030', 'federal-government', UNIX_TIMESTAMP() + 86400*365*5, '{"focus": "prevention,mental_health,aging"}', NULL, 1, 'active', 1),
(32, NULL, UNIX_TIMESTAMP() - 86400*45, 0, 'Agricultural Policy 2022+', 'program', 'admin', 'Sustainable agricultural development and food security', 'AP22+', 'federal-government', UNIX_TIMESTAMP() + 86400*365*7, '{"budget": "3.9B CHF/year", "target": "organic_25%"}', NULL, 1, 'active', 1),

-- === Assemblies (root level) ===
(3, NULL, UNIX_TIMESTAMP() - 86400*180, 0, 'Geneva Citizens Assembly', 'assembly', 'admin', 'General assembly for Geneva residents to deliberate on local issues', 'Assemblée des Citoyens Genève', 'geneva-residents', UNIX_TIMESTAMP() + 86400*365, '{"quorum": 100, "venue": "Palais Eynard"}', NULL, 0, 'active', 1),
(4, NULL, UNIX_TIMESTAMP() - 86400*150, 0, 'Bern Citizens Assembly', 'assembly', 'admin', 'General assembly for Bern canton residents', 'Bürgerversammlung Bern', 'bern-residents', UNIX_TIMESTAMP() + 86400*365, '{"quorum": 150, "venue": "Rathaus Bern"}', NULL, 0, 'active', 1),
(33, NULL, UNIX_TIMESTAMP() - 86400*120, 0, 'Zürich Cantonal Assembly', 'assembly', 'admin', 'Citizen assembly for Zürich canton', 'Kantonsversammlung Zürich', 'zurich-residents', UNIX_TIMESTAMP() + 86400*365, '{"quorum": 200, "venue": "Kantonsrat Zürich"}', NULL, 0, 'active', 1),

-- === Cantons (root level) ===
(5, NULL, UNIX_TIMESTAMP() - 86400*365, 0, 'Canton Geneva', 'canton', 'admin', 'Swiss canton of Geneva administration and services', 'République et Canton de Genève', 'geneva-government', NULL, '{"capital": "Geneva", "population": 506000, "language": "French"}', NULL, 1, 'active', 1),
(6, NULL, UNIX_TIMESTAMP() - 86400*365, 0, 'Canton Zürich', 'canton', 'admin', 'Swiss canton of Zürich administration', 'Kanton Zürich', 'zurich-government', NULL, '{"capital": "Zürich", "population": 1528000, "language": "German"}', NULL, 1, 'active', 1),
(7, NULL, UNIX_TIMESTAMP() - 86400*365, 0, 'Canton Vaud', 'canton', 'admin', 'Swiss canton of Vaud administration', 'Canton de Vaud', 'vaud-government', NULL, '{"capital": "Lausanne", "population": 799000, "language": "French"}', NULL, 1, 'active', 1),
(35, NULL, UNIX_TIMESTAMP() - 86400*365, 0, 'Canton Bern', 'canton', 'admin', 'Swiss canton of Bern administration', 'Kanton Bern', 'bern-government', NULL, '{"capital": "Bern", "population": 1035000, "language": "German/French"}', NULL, 1, 'active', 1),

-- === Districts (child of cantons) ===
(8, 7, UNIX_TIMESTAMP() - 86400*200, 0, 'District Nyon', 'district', 'admin', 'District inside Canton Vaud covering Nyon region', 'District de Nyon', 'vaud-government', NULL, '{"area": "307 km²", "municipalities": 47}', NULL, 0, 'active', 1),
(9, 6, UNIX_TIMESTAMP() - 86400*200, 0, 'District Winterthur', 'district', 'admin', 'District in Zürich canton centered around Winterthur', 'Bezirk Winterthur', 'zurich-government', NULL, '{"area": "251 km²", "municipalities": 21}', NULL, 0, 'active', 1),
(10, 6, UNIX_TIMESTAMP() - 86400*200, 0, 'District Limmattal', 'district', 'admin', 'District in Zürich canton covering Limmat valley', 'Bezirk Limmattal', 'zurich-government', NULL, '{"area": "142 km²", "municipalities": 13}', NULL, 0, 'active', 1),
(37, 35, UNIX_TIMESTAMP() - 86400*200, 0, 'District Bern-Mittelland', 'district', 'admin', 'Central district of Bern canton', 'Verwaltungskreis Bern-Mittelland', 'bern-government', NULL, '{"area": "947 km²", "municipalities": 74}', NULL, 0, 'active', 1),

-- === Communes (child of districts) ===
(11, 8, UNIX_TIMESTAMP() - 86400*100, 0, 'Commune Nyon', 'commune', 'admin', 'Municipality in Vaud, district Nyon', 'Ville de Nyon', 'nyon-residents', NULL, '{"postal_code": "1260", "mayor": "Daniel Rossellat", "population": 21200}', NULL, 0, 'active', 1),
(12, 8, UNIX_TIMESTAMP() - 86400*100, 0, 'Commune Prangins', 'commune', 'admin', 'Municipality in Vaud, district Nyon', 'Commune de Prangins', 'prangins-residents', NULL, '{"postal_code": "1197", "mayor": "Pierre-Alain Tschudi", "population": 4200}', NULL, 0, 'active', 1),
(13, 9, UNIX_TIMESTAMP() - 86400*100, 0, 'Commune Winterthur', 'commune', 'admin', 'Municipality in Zürich, district Winterthur', 'Stadt Winterthur', 'winterthur-residents', NULL, '{"postal_code": "8400", "mayor": "Michael Künzle", "population": 114000}', NULL, 0, 'active', 1),
(14, 10, UNIX_TIMESTAMP() - 86400*100, 0, 'Commune Dietikon', 'commune', 'admin', 'Municipality in Zürich, district Limmattal', 'Stadt Dietikon', 'dietikon-residents', NULL, '{"postal_code": "8953", "mayor": "Roger Bachmann", "population": 27700}', NULL, 0, 'active', 1),
(15, 5, UNIX_TIMESTAMP() - 86400*100, 0, 'Commune Geneva', 'commune', 'admin', 'Central municipality of Geneva canton', 'Ville de Genève', 'geneva-residents', NULL, '{"postal_code": "1200", "mayor": "Alfonso Gomez", "population": 203000}', NULL, 0, 'active', 1),
(39, 37, UNIX_TIMESTAMP() - 86400*100, 0, 'Commune Bern', 'commune', 'admin', 'Municipality in Bern, district Bern-Mittelland', 'Stadt Bern', 'bern-residents', NULL, '{"postal_code": "3000", "mayor": "Alec von Graffenried", "population": 134000}', NULL, 0, 'active', 1),

-- === Working Groups (various parents) ===
(16, 1, UNIX_TIMESTAMP() - 86400*80, 0, 'Energy Transition Working Group', 'working_group', 'admin', 'Energy transition team under Climate Program', 'Energy WG', 'federal-experts', UNIX_TIMESTAMP() + 86400*180, '{"chair": "Dr. Maya Schmidt", "meeting_frequency": "biweekly", "mandate": "energy_policy"}', NULL, 0, 'active', 1),
(17, 1, UNIX_TIMESTAMP() - 86400*75, 0, 'Sustainable Mobility Working Group', 'working_group', 'admin', 'Sustainable transport policy development', 'Mobility WG', 'federal-experts', UNIX_TIMESTAMP() + 86400*180, '{"chair": "Prof. Lukas Berger", "meeting_frequency": "monthly", "mandate": "transport_policy"}', NULL, 0, 'active', 1),
(18, 2, UNIX_TIMESTAMP() - 86400*70, 0, 'Digital Ethics & Privacy Taskforce', 'working_group', 'admin', 'AI and privacy taskforce for digital transformation', 'Digital Ethics TF', 'federal-experts', UNIX_TIMESTAMP() + 86400*240, '{"chair": "Prof. Anna Weber", "meeting_frequency": "monthly", "mandate": "ai_ethics"}', NULL, 0, 'active', 1),
(19, 11, UNIX_TIMESTAMP() - 86400*60, 0, 'Nyon Local Transport Committee', 'working_group', 'admin', 'Local mobility planning in Nyon', 'Transport Committee', 'nyon-council', UNIX_TIMESTAMP() + 86400*90, '{"chair": "Claude Dubois", "meeting_frequency": "monthly", "mandate": "local_transport"}', NULL, 0, 'active', 1),
(20, 15, UNIX_TIMESTAMP() - 86400*55, 0, 'Geneva Housing Strategy Group', 'working_group', 'admin', 'Affordable housing strategy development', 'Housing Group', 'geneva-council', UNIX_TIMESTAMP() + 86400*120, '{"chair": "Marie Renaud", "meeting_frequency": "biweekly", "mandate": "housing_policy"}', NULL, 0, 'active', 1),
(42, 31, UNIX_TIMESTAMP() - 86400*50, 0, 'Public Health Prevention Working Group', 'working_group', 'admin', 'Disease prevention and health promotion strategies', 'Prevention WG', 'health-experts', UNIX_TIMESTAMP() + 86400*200, '{"chair": "Dr. Thomas Müller", "meeting_frequency": "monthly", "mandate": "prevention"}', NULL, 0, 'active', 1),

-- === Commissions (various parents) ===
(21, 5, UNIX_TIMESTAMP() - 86400*365, 0, 'Geneva Environmental Commission', 'commission', 'admin', 'Expert committee for ecology and environment in Geneva', 'Commission Environnement GE', 'geneva-experts', NULL, '{"president": "Sarah Klein", "members": 15, "term": "2023-2027"}', NULL, 0, 'active', 1),
(22, 7, UNIX_TIMESTAMP() - 86400*365, 0, 'Vaud Finance Commission', 'commission', 'admin', 'Budget supervision and financial oversight for Canton Vaud', 'Commission Finances VD', 'vaud-experts', NULL, '{"president": "Marc Duval", "members": 12, "term": "2023-2027"}', NULL, 0, 'active', 1),
(23, 6, UNIX_TIMESTAMP() - 86400*365, 0, 'Zürich Digital Oversight Commission', 'commission', 'admin', 'Public digital systems audit and oversight in Zürich', 'Digitalaufsichtskommission ZH', 'zurich-experts', NULL, '{"president": "Hans Roth", "members": 10, "term": "2024-2028"}', NULL, 0, 'active', 1),
(45, 35, UNIX_TIMESTAMP() - 86400*365, 0, 'Bern Tourism Commission', 'commission', 'admin', 'Tourism development and promotion committee', 'Tourismuskommission BE', 'bern-experts', NULL, '{"president": "Erika Steiner", "members": 8, "term": "2023-2027"}', NULL, 0, 'active', 1),

-- === Bundles (various parents) ===
(24, 5, UNIX_TIMESTAMP() - 86400*40, 0, 'Geneva Urban Planning 2025 Bundle', 'bundle', 'admin', 'Package of urban reforms for Geneva development', 'Urban Development Package', 'geneva-planning-dept', UNIX_TIMESTAMP() + 86400*365, '{"theme": "urban_development", "lead_department": "Planning Department"}', NULL, 0, 'active', 1),
(25, 7, UNIX_TIMESTAMP() - 86400*35, 0, 'Vaud Mobility Masterplan Bundle', 'bundle', 'admin', 'Transport policy package for Vaud canton', 'Mobility Package VD', 'vaud-transport-dept', UNIX_TIMESTAMP() + 86400*365, '{"theme": "mobility", "lead_department": "Transport Department"}', NULL, 0, 'active', 1),
(47, 6, UNIX_TIMESTAMP() - 86400*30, 0, 'Zürich Digital Innovation Bundle', 'bundle', 'admin', 'Digital transformation projects for Zürich', 'Digital Package ZH', 'zurich-digital-dept', UNIX_TIMESTAMP() + 86400*365, '{"theme": "digital_innovation", "lead_department": "Digital Office"}', NULL, 0, 'active', 1),

-- === Archives ===
(26, 5, UNIX_TIMESTAMP() - 86400*730, 0, 'Geneva Closed Inquiries Archive', 'archive', 'admin', 'Archived inquiries for Geneva (2018-2023)', 'Archives Genève', 'geneva-archive', NULL, '{"archivist": "Jean-Luc Martin", "retention_period": "10 years"}', NULL, 1, 'active', 0),
(27, NULL, UNIX_TIMESTAMP() - 86400*730, 0, 'National Archived Consultations', 'archive', 'admin', 'National archived inquiries (2020-2024)', 'Federal Archives', 'federal-archive', NULL, '{"archivist": "Federal Archives", "retention_period": "permanent"}', NULL, 1, 'active', 0),
(49, 6, UNIX_TIMESTAMP() - 86400*730, 0, 'Zürich Historical Archive', 'archive', 'admin', 'Closed deliberations from Zürich (2015-2022)', 'Archive Zürich', 'zurich-archive', NULL, '{"archivist": "Markus Fischer", "retention_period": "7 years"}', NULL, 1, 'active', 0),

-- === Citizen Juries ===
(28, 5, UNIX_TIMESTAMP() - 86400*60, 0, 'Geneva Urban Noise Citizen Jury', 'citizen_jury', 'admin', 'Citizens selected to deliberate on urban noise regulations', 'Bruit Urbain Jury', 'geneva-residents', UNIX_TIMESTAMP() + 86400*30, '{"selection_method": "random", "duration": "3 months", "compensation": "yes"}', NULL, 0, 'active', 1),
(50, 35, UNIX_TIMESTAMP() - 86400*45, 0, 'Bern Assisted Living Citizen Jury', 'citizen_jury', 'admin', 'Citizen deliberation on elderly care options', 'Alterswohnen Jury', 'bern-residents', UNIX_TIMESTAMP() + 86400*45, '{"selection_method": "stratified_random", "duration": "4 months", "compensation": "yes"}', NULL, 0, 'active', 1),

-- === Consultation Sets ===
(29, 31, UNIX_TIMESTAMP() - 86400*50, 0, 'National Health Strategy Consultations', 'consultation_set', 'admin', 'Series of public health consultations nationwide', 'Health Dialogues', 'federal-health', UNIX_TIMESTAMP() + 86400*180, '{"theme": "public_health", "coordinator": "BAG Participation Unit", "deadline": "2025-06-30"}', NULL, 0, 'active', 1),
(52, 1, UNIX_TIMESTAMP() - 86400*40, 0, 'Swiss Energy Future Dialogues', 'consultation_set', 'admin', 'Public dialogues on energy transition pathways', 'Energy Dialogues', 'federal-energy', UNIX_TIMESTAMP() + 86400*150, '{"theme": "energy_transition", "coordinator": "BFE Dialogue Unit", "deadline": "2025-05-31"}', NULL, 0, 'active', 1),

-- Add missing groups first
(43, 32, UNIX_TIMESTAMP() - 86400*50, 0, 'Organic Farming Promotion Group', 'working_group', 'admin', 'Organic agriculture development working group', 'Organic WG', 'agriculture-experts', UNIX_TIMESTAMP() + 86400*200, '{"chair": "Dr. Franz Meyer", "meeting_frequency": "monthly"}', NULL, 0, 'active', 1),

-- === Referendum Groups ===
(30, 5, UNIX_TIMESTAMP() - 86400*90, 0, 'Geneva Parking Regulations Referendum', 'referendum_group', 'admin', 'Referendum on urban parking rules (June 2025)', 'Parking Referendum GE', 'geneva-voters', UNIX_TIMESTAMP() + 86400*60, '{"referendum_date": "2025-06-15", "signatures_required": 10000, "campaign_budget": "150000 CHF"}', NULL, 0, 'active', 1),
(54, 6, UNIX_TIMESTAMP() - 86400*80, 0, 'Zürich 30km/h Speed Limit Referendum', 'referendum_group', 'admin', 'Referendum on city-wide speed reduction', 'Tempo-30 Referendum ZH', 'zurich-voters', UNIX_TIMESTAMP() + 86400*75, '{"referendum_date": "2025-07-20", "signatures_required": 15000, "campaign_budget": "200000 CHF"}', NULL, 0, 'active', 1);

-- ============================
-- Table: oc_agora_inq_group_misc
-- ============================

INSERT INTO oc_agora_inq_group_misc (inquiry_group_id, `key`, value) VALUES
-- Location metadata
(1, 'location', 'Switzerland'),
(2, 'location', 'Switzerland'),
(3, 'location', 'Geneva'),
(4, 'location', 'Bern'),
(5, 'location', 'Geneva'),
(6, 'location', 'Zürich'),
(7, 'location', 'Vaud'),
(8, 'location', 'Nyon, Vaud'),
(9, 'location', 'Winterthur, Zürich'),
(10, 'location', 'Limmattal, Zürich'),
(11, 'location', 'Nyon'),
(12, 'location', 'Prangins'),
(13, 'location', 'Winterthur'),
(14, 'location', 'Dietikon'),
(15, 'location', 'Geneva'),
(16, 'location', 'Bern/Berne'),
(17, 'location', 'Switzerland'),
(18, 'location', 'Switzerland'),
(19, 'location', 'Nyon'),
(20, 'location', 'Geneva'),
(21, 'location', 'Vaud'),
(22, 'location', 'Zürich'),
(23, 'location', 'Geneva'),
(24, 'location', 'Vaud'),
(25, 'location', 'Geneva'),
(26, 'location', 'Switzerland'),
(27, 'location', 'Geneva'),
(28, 'location', 'Switzerland'),
(29, 'location', 'Geneva'),
(30, 'location', 'Switzerland'),
(31, 'location', 'Switzerland'),
(32, 'location', 'Bern'),
(33, 'location', 'Bern-Mittelland'),
(35, 'location', 'Bern'),
(37, 'location', 'Switzerland'),
(39, 'location', 'Bern'),
(42, 'location', 'Zürich'),
(45, 'location', 'Bern'),
(47, 'location', 'Zürich'),
(49, 'location', 'Bern'),
(50, 'location', 'Switzerland'),
(52, 'location', 'Zürich'),
(54, 'location', 'Zürich'),

-- Additional metadata
(1, 'language', 'de,fr,it,rm'),
(5, 'language', 'fr'),
(6, 'language', 'de'),
(7, 'language', 'fr'),
(28, 'juror_count', '25'),
(28, 'meeting_dates', '2025-03-15,2025-03-29,2025-04-12'),
(30, 'referendum_number', 'GE-2025-045'),
(54, 'referendum_number', 'ZH-2025-128');

-- ============================
-- Table: oc_agora_inquiries (corrected support_feature)
-- ============================

INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, access, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, support_feature, family) VALUES
-- Climate Program Inquiries
(1, NULL, 'news', 'Federal Council Adopts New Climate Measures', 'Switzerland updates its climate targets for 2030 with stricter CO2 reduction goals for buildings and transport sectors.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*20, 0, 0, 0, 'federal-government', 'open', 'always', UNIX_TIMESTAMP() - 86400*5, NULL, 'accepted', 'published', 1, 'none', 'collective'),
(11, NULL, 'consultation', 'Public Consultation: Renewable Energy Expansion 2025-2030', 'Seeking public input on solar and wind energy development targets and support programs for the next 5 years.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*15, 0, UNIX_TIMESTAMP() + 86400*45, 0, 'federal-energy', 'open', 'after_vote', UNIX_TIMESTAMP() - 86400*2, NULL, 'accepted', 'active', 1, 'none', 'deliberative'),
(12, NULL, 'meeting', 'Energy Working Group Q1 Meeting: Implementation Review', 'Quarterly meeting to discuss implementation progress of energy transition measures and budget allocation.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*10, 0, UNIX_TIMESTAMP() + 86400*5, 0, 'federal-experts', 'open', 'always', UNIX_TIMESTAMP() - 86400*1, NULL, 'accepted', 'active', 1, 'none', 'deliberative'),
(13, NULL, 'proposal', 'Proposal: Carbon Tax Revenues Allocation Framework', 'Detailed proposal on how to allocate revenues from CO2 levy between climate fund, population redistribution, and innovation programs.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*5, 0, UNIX_TIMESTAMP() + 86400*60, 0, 'federal-government', 'open', 'always', UNIX_TIMESTAMP() - 86400*1, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),

-- Digital Program Inquiries
(14, NULL, 'consultation', 'Swiss Digital ID Public Consultation', 'Public feedback on the proposed Swiss Digital Identity system: features, privacy safeguards, and implementation timeline.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*25, 0, UNIX_TIMESTAMP() + 86400*30, 0, 'federal-digital', 'open', 'after_vote', UNIX_TIMESTAMP() - 86400*3, NULL, 'accepted', 'active', 1, 'none', 'deliberative'),
(15, NULL, 'deliberation', 'AI Regulation Framework Expert Debate', 'Structured expert debate on AI governance, risk classification, and regulatory approaches for Switzerland.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*18, 0, UNIX_TIMESTAMP() + 86400*15, 0, 'federal-experts', 'open', 'always', UNIX_TIMESTAMP() - 86400*2, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
(16, NULL, 'announcement', 'New Public API Platform Launch: api.admin.ch', 'Federal administration opens new API platform for developers to access public data and services.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*12, 0, 0, 0, 'federal-digital', 'open', 'always', UNIX_TIMESTAMP() - 86400*1, NULL, 'accepted', 'published', 1, 'none', 'collective'),

-- Health Program Inquiries
(17, NULL, 'consultation', 'Mental Health Strategy 2025-2030: Public Input', 'Public consultation on new mental health services framework, prevention programs, and support systems.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*22, 0, UNIX_TIMESTAMP() + 86400*40, 0, 'federal-health', 'open', 'after_vote', UNIX_TIMESTAMP() - 86400*4, NULL, 'accepted', 'active', 1, 'none', 'deliberative'),
(18, NULL, 'meeting', 'Prevention Working Group: Monthly Strategy Session', 'Monthly working group session to develop prevention programs for non-communicable diseases.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*8, 0, UNIX_TIMESTAMP() + 86400*2, 0, 'health-experts', 'open', 'never', UNIX_TIMESTAMP() - 86400*1, NULL, 'accepted', 'active', 0, 'none', 'deliberative'),

-- Geneva Citizen Assembly
(2, NULL, 'meeting', 'Geneva Citizens Assembly: Annual Budget Deliberation 2026', 'Geneva residents invited to discuss and provide input on the 2026 municipal budget priorities.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*35, 0, UNIX_TIMESTAMP() + 86400*10, 0, 'geneva-residents', 'open', 'always', UNIX_TIMESTAMP() - 86400*6, NULL, 'accepted', 'active', 1, 'none', 'deliberative'),
(19, NULL, 'deliberation', 'Urban Development Projects: Public Debate', 'Citizens debate major construction projects including new housing, parks, and infrastructure.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*12, 0, UNIX_TIMESTAMP() + 86400*20, 0, 'geneva-residents', 'open', 'always', UNIX_TIMESTAMP() - 86400*3, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),

-- Local Commune Inquiries
(3, NULL, 'consultation', 'Winterthur Bike Lane Expansion: Route Planning', 'Public consultation on new bike infrastructure including protected lanes and parking facilities.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*28, 0, UNIX_TIMESTAMP() + 86400*15, 0, 'winterthur-residents', 'open', 'after_vote', UNIX_TIMESTAMP() - 86400*2, NULL, 'accepted', 'active', 1, 'none', 'deliberative'),
(20, NULL, 'proposal', 'Nyon Pedestrian Zone Extension Proposal', 'Proposal to expand car-free zone in city center to include Rue de Rive and improve public spaces.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*18, 0, UNIX_TIMESTAMP() + 86400*25, 0, 'nyon-residents', 'open', 'always', UNIX_TIMESTAMP() - 86400*4, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
(21, NULL, 'meeting', 'Prangins Town Hall: Monthly Commune Meeting', 'Monthly commune meeting open to all residents for local matters and announcements.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*5, 0, UNIX_TIMESTAMP() + 86400*1, 0, 'prangins-residents', 'open', 'always', UNIX_TIMESTAMP() - 86400*1, NULL, 'accepted', 'active', 1, 'none', 'deliberative'),

-- Working Group Inquiries
(4, NULL, 'proposal', 'Solar Panel Subsidy Program Revision', 'Proposal for updated residential solar incentives including battery storage support.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*25, 0, UNIX_TIMESTAMP() + 86400*35, 0, 'federal-experts', 'open', 'always', UNIX_TIMESTAMP() - 86400*3, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
(5, NULL, 'announcement', 'New Mobility Rules for E-Scooters and Bikes', 'Updated regulations for micromobility devices including parking zones and speed limits.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*22, 0, 0, 0, 'federal-experts', 'open', 'always', UNIX_TIMESTAMP() - 86400*1, NULL, 'accepted', 'published', 0, 'none', 'collective'),
(6, NULL, 'consultation', 'Geneva Affordable Housing Strategy 2025-2030', 'Public input on new housing policies including rent control, social housing quotas, and construction targets.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*15, 0, UNIX_TIMESTAMP() + 86400*30, 0, 'geneva-residents', 'open', 'after_vote', UNIX_TIMESTAMP() - 86400*2, NULL, 'accepted', 'active', 1, 'none', 'deliberative'),
(7, NULL, 'deliberation', 'Digital Privacy Standards: Technical Debate', 'Technical debate on data protection standards for public digital services.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*14, 0, UNIX_TIMESTAMP() + 86400*10, 0, 'federal-experts', 'open', 'always', UNIX_TIMESTAMP() - 86400*2, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
(8, NULL, 'meeting', 'Nyon Transport Committee: Monthly Mobility Meeting', 'Monthly mobility committee meeting to discuss local transport issues and projects.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*5, 0, UNIX_TIMESTAMP() + 86400*2, 0, 'nyon-council', 'open', 'never', UNIX_TIMESTAMP() - 86400*1, NULL, 'accepted', 'active', 0, 'none', 'deliberative'),

-- Citizen Jury Inquiries
(9, NULL, 'news', 'Urban Noise Pollution: Citizen Jury Findings Published', 'Findings and recommendations from the citizen jury deliberation on urban noise regulations.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*8, 0, 0, 0, 'geneva-residents', 'open', 'always', UNIX_TIMESTAMP() - 86400*1, NULL, 'accepted', 'published', 1, 'none', 'collective'),
(22, NULL, 'deliberation', 'Assisted Living Options: Citizen Jury Deliberation', 'Citizen jury evaluates different elderly care models and makes recommendations.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*12, 0, UNIX_TIMESTAMP() + 86400*20, 0, 'bern-residents', 'open', 'always', UNIX_TIMESTAMP() - 86400*3, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),

-- Bundle Inquiries
(10, NULL, 'proposal', 'Green Urban Planning 2025: Comprehensive Development', 'Comprehensive urban development proposal including green spaces, mixed-use zoning, and sustainable construction.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*7, 0, UNIX_TIMESTAMP() + 86400*40, 0, 'geneva-planning-dept', 'open', 'always', UNIX_TIMESTAMP() - 86400*2, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
(24, NULL, 'meeting', 'Zürich Digital Projects Review Meeting', 'Quarterly review of ongoing digital transformation projects and budget allocation.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*10, 0, UNIX_TIMESTAMP() + 86400*3, 0, 'zurich-digital-dept', 'open', 'never', UNIX_TIMESTAMP() - 86400*1, NULL, 'accepted', 'active', 0, 'none', 'deliberative'),

-- Referendum Inquiries
(25, NULL, 'consultation', 'Pre-Referendum: Geneva Parking Regulations Review', 'Information session and public feedback collection before the parking referendum vote.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*22, 0, UNIX_TIMESTAMP() + 86400*10, 0, 'geneva-voters', 'open', 'always', UNIX_TIMESTAMP() - 86400*4, NULL, 'accepted', 'active', 1, 'none', 'deliberative'),
(26, NULL, 'news', 'Federal CO2 Levy Referendum Date Set for September 2025', 'Official announcement: Federal referendum on carbon pricing increase scheduled for September 28, 2025.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*18, 0, 0, 0, 'swiss-voters', 'open', 'always', UNIX_TIMESTAMP() - 86400*2, NULL, 'accepted', 'published', 1, 'none', 'collective'),

-- Agricultural Program
(29, NULL, 'consultation', 'Organic Farming Support Programs 2026-2030', 'Public input on organic agriculture subsidy programs and transition support.', 0, 0, 'admin', UNIX_TIMESTAMP() - 86400*12, 0, UNIX_TIMESTAMP() + 86400*25, 0, 'farmers-association', 'open', 'after_vote', UNIX_TIMESTAMP() - 86400*3, NULL, 'accepted', 'active', 1, 'none', 'deliberative'),

-- 5001 — Genève / Mobilité douce
(5001, NULL, 'proposal', 'Créer plus de pistes cyclables à Genève', 'Extension du réseau cyclable entre Plainpalais et Cornavin.', 101, 6, 'admin', UNIX_TIMESTAMP()-86400*200, 0, UNIX_TIMESTAMP()+86400*160, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*190, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
-- 5002 — Zürich / Débat
(5002, NULL, 'debate', 'Limiter le trafic automobile au centre de Zürich', 'Faut-il interdire les voitures dans la vieille ville ?', 102, 11, 'moderator', UNIX_TIMESTAMP()-86400*150, 0, UNIX_TIMESTAMP()+86400*120, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*145, NULL, 'accepted', 'active', 1, 'none', 'collective'),
-- 5003 — Lausanne / Projet solaire
(5003, NULL, 'project', 'Installation de panneaux solaires sur les écoles de Lausanne', 'Projet de transition énergétique soutenu par la commune.', 103, 5, 'test', UNIX_TIMESTAMP()-86400*100, 0, UNIX_TIMESTAMP()+86400*200, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*95, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
-- 5004 — Nyon / Pétition
(5004, NULL, 'petition', 'Protéger la rive du lac à Nyon', 'Interdire les constructions privées sur la zone littorale.', 104, 2, 'test2', UNIX_TIMESTAMP()-86400*80, 0, UNIX_TIMESTAMP()+86400*60, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*75, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
-- 5005 — Berne / Grief
(5005, NULL, 'grievance', 'Bruit excessif aux abords de la gare de Berne', 'Plainte concernant le trafic de nuit.', 105, 23, 'test3', UNIX_TIMESTAMP()-86400*60, 0, UNIX_TIMESTAMP()+86400*120, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*55, NULL, 'accepted', 'active', 1, 'none', 'administrative'),
-- 5006 — Lausanne / Suggestion liée
(5006, NULL, 'suggestion', 'Installer des parois anti-bruit', 'Suggestion liée à la plainte 5005.', 103, 6, 'admin', UNIX_TIMESTAMP()-86400*55, 0, UNIX_TIMESTAMP()+86400*100, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*50, 5005, 'accepted', 'active', 1, 'binary', 'deliberative'),
-- 5007 — Genève / Communauté
(5007, NULL, 'proposal', 'Planter 2''000 arbres à Genève', 'Plan de reforestation urbaine.', 101, 9, 'moderator', UNIX_TIMESTAMP()-86400*40, 0, UNIX_TIMESTAMP()+86400*200, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*35, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
-- 5008 — Réponse officielle (Genève)
(5008, NULL, 'official', 'Réponse officielle : Arbres à Genève', 'Le service des espaces verts soutient le projet.', 101, 9, 'official', UNIX_TIMESTAMP()-86400*38, 0, UNIX_TIMESTAMP()+86400*120, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*37, 5007, 'accepted', 'active', 1, 'none', 'official'),
-- 5009 — Winterthur / Jardin communautaire
(5009, NULL, 'project', 'Créer un jardin partagé à Winterthur', 'Espace vert ouvert géré par les habitants.', 106, 17, 'test', UNIX_TIMESTAMP()-86400*30, 0, UNIX_TIMESTAMP()+86400*200, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*25, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
-- 5010 — Suggestion liée
(5010, NULL, 'proposal', 'Installer une serre permaculture', 'Extension du projet 5009.', 106, 4, 'test2', UNIX_TIMESTAMP()-86400*28, 0, UNIX_TIMESTAMP()+86400*150, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*25, 5009, 'accepted', 'active', 1, 'binary', 'deliberative'),
-- 5011 — Berne / Transport
(5011, NULL, 'grievance', 'Retards récurrents des bus bernois', 'Nombreuses plaintes depuis l''automne.', 105, 9, 'test3', UNIX_TIMESTAMP()-86400*27, 0, UNIX_TIMESTAMP()+86400*90, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*26, NULL, 'accepted', 'active', 1, 'none', 'administrative'),
-- 5012 — Suggestion bus GPS
(5012, NULL, 'suggestion', 'Ajouter un système GPS aux bus', 'Suggestion liée à la plainte 5011.', 105, 9, 'admin', UNIX_TIMESTAMP()-86400*26, 0, UNIX_TIMESTAMP()+86400*100, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*25, 5011, 'accepted', 'active', 1, 'binary', 'deliberative'),
-- 5013 — Zürich / Jet-skis
(5013, NULL, 'petition', 'Interdire les jet-skis sur le lac de Zürich', 'Réduction du bruit et protection du lac.', 102, 3, 'moderator', UNIX_TIMESTAMP()-86400*24, 0, UNIX_TIMESTAMP()+86400*60, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*22, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
-- 5014 — Vaud / École
(5014, NULL, 'debate', 'Faut-il prolonger les heures d''école dans le canton de Vaud ?', 'Débat public sur la conciliation travail-famille.', 103, 26, 'test', UNIX_TIMESTAMP()-86400*20, 0, UNIX_TIMESTAMP()+86400*90, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*18, NULL, 'accepted', 'active', 1, 'none', 'collective'),
-- 5015 — Genève / Écologie
(5015, NULL, 'proposal', 'Toitures végétalisées pour les bâtiments publics', 'Projet de verdissement urbain.', 101, 2, 'test2', UNIX_TIMESTAMP()-86400*15, 0, UNIX_TIMESTAMP()+86400*200, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*14, NULL, 'accepted', 'active', 1, 'binary', 'deliberative'),
-- 5016 — Réponse officielle toits verts
(5016, NULL, 'official', 'Réponse officielle : Toitures végétalisées', 'Projet accepté en phase d''étude.', 101, 2, 'official', UNIX_TIMESTAMP()-86400*14, 0, UNIX_TIMESTAMP()+86400*120, 0, '', 'open', 'always', UNIX_TIMESTAMP()-86400*13, 5015, 'accepted', 'active', 1, 'none', 'official');

-- ============================
-- Table: oc_agora_options (new)
-- ============================

-- ============================
-- Table: oc_agora_options (corrected)
-- ============================

INSERT INTO oc_agora_options (id, title, target_id, parent_id, type, access, text, owner, owned_group, created, updated, show_results, deleted, archived, option_status, allow_comment, support_feature, family, sort_order) VALUES
-- Options for inquiry 5001 (proposal) – now with correct family and support_feature
(10001, 'Soutenir la piste cyclable', 5001, 0, 'proposal', 'open', 'Je soutiens ce projet de pistes cyclables.', 'admin', '', UNIX_TIMESTAMP()-86400*195, UNIX_TIMESTAMP()-86400*195, 'always', 0, 0, 'active', 1, 'ternary', 'proposal', 1),
(10002, 'S''opposer à la piste cyclable', 5001, 0, 'proposal', 'open', 'Je suis contre ce projet pour des raisons de coût.', 'moderator', '', UNIX_TIMESTAMP()-86400*190, UNIX_TIMESTAMP()-86400*190, 'always', 0, 0, 'active', 1, 'ternary', 'proposal', 2),

-- Options for inquiry 5002 (debate)
(10003, 'Pour l''interdiction des voitures', 5002, 0, 'position_for', 'open', 'Il faut interdire les voitures en vieille ville pour réduire la pollution.', 'test', '', UNIX_TIMESTAMP()-86400*145, UNIX_TIMESTAMP()-86400*145, 'always', 0, 0, 'active', 1, 'ternary', 'debate', 1),
(10004, 'Contre l''interdiction', 5002, 0, 'position_against', 'open', 'Cela pénaliserait les commerces et les riverains.', 'admin', '', UNIX_TIMESTAMP()-86400*144, UNIX_TIMESTAMP()-86400*144, 'always', 0, 0, 'active', 1, 'ternary', 'debate', 2),

-- Options for inquiry 5003 (project)
(10005, 'Soutenir le projet solaire', 5003, 0, 'proposal', 'open', 'Je soutiens ce projet.', 'test2', '', UNIX_TIMESTAMP()-86400*95, UNIX_TIMESTAMP()-86400*95, 'always', 0, 0, 'active', 1, 'ternary', 'proposal', 1),

-- Options for inquiry 5004 (petition)
(10006, 'Signer la pétition', 5004, 0, 'proposal', 'open', 'Je soutiens la protection de la rive.', 'moderator', '', UNIX_TIMESTAMP()-86400*75, UNIX_TIMESTAMP()-86400*75, 'always', 0, 0, 'active', 1, 'ternary', 'proposal', 1),

-- Option for inquiry 5006 (suggestion) – replaced with valid type 'message'
(10007, 'Suggestion acceptée', 5006, 0, 'message', 'open', 'Installer des parois anti-bruit', 'admin', '', UNIX_TIMESTAMP()-86400*50, UNIX_TIMESTAMP()-86400*50, 'always', 0, 0, 'active', 1, 'none', 'debate', 1),

-- Options for inquiry 5007 (proposal)
(10008, 'Planter des arbres', 5007, 0, 'proposal', 'open', 'Je soutiens le projet de reforestation.', 'test', '', UNIX_TIMESTAMP()-86400*35, UNIX_TIMESTAMP()-86400*35, 'always', 0, 0, 'active', 1, 'ternary', 'proposal', 1),

-- Options for inquiry 5009 (project)
(10009, 'Créer le jardin', 5009, 0, 'proposal', 'open', 'Je soutiens le jardin partagé.', 'test3', '', UNIX_TIMESTAMP()-86400*25, UNIX_TIMESTAMP()-86400*25, 'always', 0, 0, 'active', 1, 'ternary', 'proposal', 1),

-- Option for inquiry 5010 (proposal)
(10010, 'Installer une serre', 5010, 0, 'proposal', 'open', 'Je soutiens cette extension.', 'test2', '', UNIX_TIMESTAMP()-86400*25, UNIX_TIMESTAMP()-86400*25, 'always', 0, 0, 'active', 1, 'ternary', 'proposal', 1),

-- Option for inquiry 5012 (suggestion) – replaced with valid type 'message'
(10011, 'Suggestion GPS', 5012, 0, 'message', 'open', 'Ajouter un système GPS', 'admin', '', UNIX_TIMESTAMP()-86400*25, UNIX_TIMESTAMP()-86400*25, 'always', 0, 0, 'active', 1, 'none', 'debate', 1),

-- Options for inquiry 5013 (petition)
(10012, 'Signer la pétition', 5013, 0, 'proposal', 'open', 'Je soutiens l''interdiction des jet-skis.', 'test', '', UNIX_TIMESTAMP()-86400*22, UNIX_TIMESTAMP()-86400*22, 'always', 0, 0, 'active', 1, 'ternary', 'proposal', 1),

-- Options for inquiry 5014 (debate)
(10013, 'Pour la prolongation', 5014, 0, 'position_for', 'open', 'Cela aide les parents.', 'test3', '', UNIX_TIMESTAMP()-86400*18, UNIX_TIMESTAMP()-86400*18, 'always', 0, 0, 'active', 1, 'ternary', 'debate', 1),
(10014, 'Contre la prolongation', 5014, 0, 'position_against', 'open', 'Cela surcharge les enfants.', 'admin', '', UNIX_TIMESTAMP()-86400*17, UNIX_TIMESTAMP()-86400*17, 'always', 0, 0, 'active', 1, 'ternary', 'debate', 2),

-- Options for inquiry 5015 (proposal)
(10015, 'Toitures végétalisées', 5015, 0, 'proposal', 'open', 'Je soutiens les toits verts.', 'test2', '', UNIX_TIMESTAMP()-86400*14, UNIX_TIMESTAMP()-86400*14, 'always', 0, 0, 'active', 1, 'ternary', 'proposal', 1),

-- ============================================
-- Structure family (for inquiry 5001)
-- ============================================
(10021, 'Chapter 1: General Provisions', 5001, 0, 'chapter', 'open', 'Definitions and scope of the cycling network expansion.', 'admin', '', UNIX_TIMESTAMP()-86400*190, UNIX_TIMESTAMP()-86400*190, 'always', 0, 0, 'active', 0, 'none', 'structure', 1),
(10022, 'Section 1.1: Definitions', 5001, 10021, 'section', 'open', 'Terms used in this proposal.', 'admin', '', UNIX_TIMESTAMP()-86400*189, UNIX_TIMESTAMP()-86400*189, 'always', 0, 0, 'active', 0, 'none', 'structure', 1),
(10023, 'Article 1.1.1 – Cycle lane width', 5001, 10022, 'article', 'open', 'Cycle lanes must be at least 2.0 meters wide.', 'test', '', UNIX_TIMESTAMP()-86400*188, UNIX_TIMESTAMP()-86400*188, 'always', 0, 0, 'active', 1, 'none', 'structure', 1),
(10024, 'Amendment: Increase width to 2.5m', 5001, 10023, 'amendment', 'open', '{"article_ref":10023,"proposed_text":"… at least 2.5 meters wide."}', 'test2', '', UNIX_TIMESTAMP()-86400*187, UNIX_TIMESTAMP()-86400*187, 'always', 0, 0, 'active', 1, 'ternary', 'structure', 1),

-- ============================================
-- Consensus family (for inquiry 5014)
-- ============================================
(10025, 'Do you support longer school hours?', 5014, 0, 'consultation_question', 'open', 'Please indicate your level of support.', 'moderator', '', UNIX_TIMESTAMP()-86400*17, UNIX_TIMESTAMP()-86400*17, 'always', 0, 0, 'active', 1, 'none', 'consensus', 1),
(10026, 'Yes, strongly support', 5014, 10025, 'poll_option', 'open', 'Fully in favour', 'test', '', UNIX_TIMESTAMP()-86400*16, UNIX_TIMESTAMP()-86400*16, 'always', 0, 0, 'active', 1, 'binary', 'consensus', 1),
(10027, 'Yes, with conditions', 5014, 10025, 'poll_option', 'open', 'Support only if childcare is provided', 'test3', '', UNIX_TIMESTAMP()-86400*15, UNIX_TIMESTAMP()-86400*15, 'always', 0, 0, 'active', 1, 'binary', 'consensus', 2),
(10028, 'No, against', 5014, 10025, 'poll_option', 'open', 'Oppose any extension', 'admin', '', UNIX_TIMESTAMP()-86400*14, UNIX_TIMESTAMP()-86400*14, 'always', 0, 0, 'active', 1, 'binary', 'consensus', 3),

-- ============================================
-- Workflow family (for inquiry 5009)
-- ============================================
(10016, 'Workflow: Shared Garden Creation', 5009, 0, 'workflow_item', 'open', '{"priority":"high","assigned_to":"test3","due_date":"2025-08-01"}', 'admin', '', UNIX_TIMESTAMP()-86400*20, UNIX_TIMESTAMP()-86400*20, 'always', 0, 0, 'active', 1, 'binary', 'workflow', 1),
(10017, 'Transition: Draft → In Progress', 5009, 10016, 'workflow_transition', 'open', '{"from_status":"draft","to_status":"in_progress","justification":"Work started"}', 'admin', '', UNIX_TIMESTAMP()-86400*19, UNIX_TIMESTAMP()-86400*19, 'always', 0, 0, 'active', 0, 'none', 'workflow', 2),
(10018, 'Blocker: Permit delay', 5009, 10016, 'workflow_blocker', 'open', '{"severity":"major","reason":"City permit not yet issued"}', 'test2', '', UNIX_TIMESTAMP()-86400*18, UNIX_TIMESTAMP()-86400*18, 'always', 0, 0, 'active', 1, 'binary', 'workflow', 3),

-- ============================================
-- Decision family (for inquiry 5008)
-- ============================================
(10029, 'Official Decision: Tree Planting Approved', 5008, 0, 'official_result', 'open', '{"resolution":"approved","effective_date":"2025-04-01","budget":"450000 CHF"}', 'official', '', UNIX_TIMESTAMP()-86400*37, UNIX_TIMESTAMP()-86400*37, 'always', 0, 0, 'active', 1, 'none', 'decision', 1);


-- Support for the workflow blocker
INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, created, support_hash) VALUES
(5009, 10018, 'admin', 1, UNIX_TIMESTAMP()-86400*18, MD5(CONCAT('5009','admin','10018'))),
(5009, 10018, 'test', 1, UNIX_TIMESTAMP()-86400*17, MD5(CONCAT('5009','test','10018')));

-- Support for poll options (binary)
INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, created, support_hash) VALUES
(5014, 10026, 'test', 1, UNIX_TIMESTAMP()-86400*15, MD5(CONCAT('5014','test','10026'))),
(5014, 10026, 'test2', 1, UNIX_TIMESTAMP()-86400*14, MD5(CONCAT('5014','test2','10026'))),
(5014, 10027, 'test3', 1, UNIX_TIMESTAMP()-86400*13, MD5(CONCAT('5014','test3','10027'))),
(5014, 10028, 'admin', 1, UNIX_TIMESTAMP()-86400*12, MD5(CONCAT('5014','admin','10028')));



-- ============================
-- Table: oc_agora_supports (corrected with new option_ids)
-- ============================


INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, created, support_hash) VALUES
-- Support for inquiry 5001 (proposal) - binary: +1 for, -1 against
(5001, 10001, 'test',      1, UNIX_TIMESTAMP()-86400*190, MD5(CONCAT('5001','test','10001'))),
(5001, 10001, 'test2',     1, UNIX_TIMESTAMP()-86400*189, MD5(CONCAT('5001','test2','10001'))),
(5001, 10001, 'moderator', 1, UNIX_TIMESTAMP()-86400*188, MD5(CONCAT('5001','moderator','10001'))),
(5001, 10002, 'test3',    -1, UNIX_TIMESTAMP()-86400*187, MD5(CONCAT('5001','test3','10002'))),

-- Support for inquiry 5002 (debate) - ternary: +1, 0, -1
(5002, 10003, 'test3',  +1, UNIX_TIMESTAMP()-86400*145, MD5(CONCAT('5002','test3','10003'))),
(5002, 10003, 'admin',   0, UNIX_TIMESTAMP()-86400*144, MD5(CONCAT('5002','admin','10003'))),
(5002, 10004, 'admin',  -1, UNIX_TIMESTAMP()-86400*143, MD5(CONCAT('5002','admin','10004'))),

-- Support for inquiry 5003 (project) - binary
(5003, 10005, 'admin', 1, UNIX_TIMESTAMP()-86400*95, MD5(CONCAT('5003','admin','10005'))),
(5003, 10005, 'test2', 1, UNIX_TIMESTAMP()-86400*94, MD5(CONCAT('5003','test2','10005'))),

-- Support for inquiry 5004 (petition) - binary
(5004, 10006, 'moderator', 1, UNIX_TIMESTAMP()-86400*75, MD5(CONCAT('5004','moderator','10006'))),
(5004, 10006, 'test',      1, UNIX_TIMESTAMP()-86400*74, MD5(CONCAT('5004','test','10006'))),
(5004, 10006, 'test3',    -1, UNIX_TIMESTAMP()-86400*73, MD5(CONCAT('5004','test3','10006'))),

-- Support for inquiry 5007 (proposal) - binary
(5007, 10008, 'admin', 1, UNIX_TIMESTAMP()-86400*35, MD5(CONCAT('5007','admin','10008'))),

-- Support for inquiry 5009 (project) - binary
(5009, 10009, 'test2', 1, UNIX_TIMESTAMP()-86400*25, MD5(CONCAT('5009','test2','10009'))),

-- Support for inquiry 5013 (petition) - binary
(5013, 10012, 'test3', 1, UNIX_TIMESTAMP()-86400*22, MD5(CONCAT('5013','test3','10012'))),
(5013, 10012, 'test', -1, UNIX_TIMESTAMP()-86400*21, MD5(CONCAT('5013','test','10012'))),
-- Support for inquiry 5015 (proposal) - binary

(5015, 10015, 'admin', 1, UNIX_TIMESTAMP()-86400*14, MD5(CONCAT('5015','admin','10015'))),

-- Inquiry-level support (option_id = 0) for inquiries with support_feature 'binary'
(13, 0, 'admin', 1, UNIX_TIMESTAMP()-86400*4, MD5(CONCAT('13','admin','0'))),
(15, 0, 'test', 1, UNIX_TIMESTAMP()-86400*2, MD5(CONCAT('15','test','0'))),
(19, 0, 'moderator', 1, UNIX_TIMESTAMP()-86400*2, MD5(CONCAT('19','moderator','0'))),
(20, 0, 'test2', 1, UNIX_TIMESTAMP()-86400*3, MD5(CONCAT('20','test2','0'))),
(4, 0, 'admin', 1, UNIX_TIMESTAMP()-86400*2, MD5(CONCAT('4','admin','0'))),
(7, 0, 'test3', 1, UNIX_TIMESTAMP()-86400*1, MD5(CONCAT('7','test3','0'))),
(10, 0, 'test', 1, UNIX_TIMESTAMP()-86400*1, MD5(CONCAT('10','test','0'))),
(22, 0, 'admin', 1, UNIX_TIMESTAMP()-86400*2, MD5(CONCAT('22','admin','0')));

-- ============================
-- Table: oc_agora_comments (added option_id references)
-- ============================

INSERT INTO oc_agora_comments (inquiry_id, option_id, user_id, comment, timestamp, deleted, confidential, recipient) VALUES
(5001, 10001, 'test2', 'Très bonne idée pour la mobilité !', UNIX_TIMESTAMP()-86400*190, 0, 0, NULL),
(5002, 10003, 'admin', 'Cela réduira la congestion mais affectera les commerces.', UNIX_TIMESTAMP()-86400*145, 0, 0, NULL),
(5003, 10005, 'moderator', 'Excellente initiative énergétique.', UNIX_TIMESTAMP()-86400*95, 0, 0, NULL),
(5005, 0, 'test', 'Le bruit devient insupportable la nuit.', UNIX_TIMESTAMP()-86400*55, 0, 0, NULL),
(5007, 10008, 'test2', 'Plus d''arbres = meilleure qualité de vie.', UNIX_TIMESTAMP()-86400*35, 0, 0, NULL),
(5009, 10009, 'test3', 'Parfait pour renforcer le lien social.', UNIX_TIMESTAMP()-86400*25, 0, 0, NULL),
(5013, 10012, 'test', 'Le lac est déjà trop bruyant l''été.', UNIX_TIMESTAMP()-86400*22, 0, 0, NULL),
(5015, 10015, 'admin', 'Cela réduira les îlots de chaleur.', UNIX_TIMESTAMP()-86400*14, 0, 0, NULL);

-- ============================
-- Table: oc_agora_inq_misc (unchanged)
-- ============================

INSERT INTO oc_agora_inq_misc (inquiry_id, `key`, value) VALUES
-- Existing entries (unchanged)
(11, 'consultation_start', '2025-01-25'),
(11, 'consultation_end', '2025-03-25'),
(11, 'target_participants', '10000'),
(14, 'consultation_start', '2025-01-30'),
(14, 'consultation_end', '2025-03-15'),
(14, 'digital_id_version', '2.0'),
(25, 'referendum_date', '2025-06-15'),
(25, 'referendum_number', 'GE-2025-045'),
(25, 'campaign_website', 'https://ge.ch/parking-referendum'),
(26, 'referendum_date', '2025-09-28'),
(26, 'referendum_number', 'CH-2025-128'),
(26, 'required_signatures', '50000'),
(2, 'meeting_date', '2025-03-15'),
(2, 'meeting_time', '14:00'),
(2, 'meeting_location', 'Palais Eynard, Geneva'),
(2, 'registration_required', 'yes'),
(12, 'meeting_date', '2025-03-20'),
(12, 'meeting_time', '10:00'),
(12, 'meeting_location', 'BFE Building, Bern'),
(12, 'agenda_url', 'https://bfe.admin.ch/agenda-q1-2025'),
(1, 'contact_email', 'climate@admin.ch'),
(1, 'contact_phone', '+41 58 462 56 11'),
(1, 'official_gazette', 'https://www.fedlex.admin.ch/eli/fga/2025/123'),
(3, 'contact_email', 'mobilitaet@win.ch'),
(3, 'contact_phone', '+41 52 267 51 11'),
(3, 'project_manager', 'Anna Müller'),
(3, 'participant_count', '1247'),
(14, 'participant_count', '3568'),
(17, 'participant_count', '892'),
(11, 'participant_count', '2156'),
(1, 'geo_scope', 'national'),
(3, 'geo_scope', 'commune'),
(20, 'geo_scope', 'commune'),
(25, 'geo_scope', 'canton'),
(13, 'legal_basis', 'CO2 Law Art. 34'),
(25, 'legal_basis', 'Geneva Parking Ordinance Art. 12'),
(29, 'legal_basis', 'Federal Agriculture Law Art. 104'),
(9, 'report_url', 'https://ge.ch/urban-noise-report-2025.pdf'),
(9, 'executive_summary', 'https://ge.ch/urban-noise-summary.pdf'),
(15, 'background_paper', 'https://bakom.admin.ch/ai-regulation-whitepaper'),
(10, 'full_proposal', 'https://ge.ch/urban-planning-2025-full.pdf'),
-- layout_zone and render_mode
(1,  'layout_zone', 'footer'), (1,  'render_mode', 'cards'),
(9,  'layout_zone', 'footer'), (9,  'render_mode', 'cards'),
(26, 'layout_zone', 'footer'), (26, 'render_mode', 'cards'),
(12, 'layout_zone', 'main'), (12, 'render_mode', 'cards'),
(2,  'layout_zone', 'main'), (2,  'render_mode', 'cards'),
(18, 'layout_zone', 'main'), (18, 'render_mode', 'cards'),
(21, 'layout_zone', 'main'), (21, 'render_mode', 'cards'),
(8,  'layout_zone', 'main'), (8,  'render_mode', 'cards'),
(24, 'layout_zone', 'main'), (24, 'render_mode', 'cards'),
(11, 'layout_zone', 'sidebar'), (11, 'render_mode', 'summary'),
(13, 'layout_zone', 'sidebar'), (13, 'render_mode', 'summary'),
(14, 'layout_zone', 'sidebar'), (14, 'render_mode', 'summary'),
(15, 'layout_zone', 'sidebar'), (15, 'render_mode', 'summary'),
(16, 'layout_zone', 'sidebar'), (16, 'render_mode', 'summary'),
(17, 'layout_zone', 'sidebar'), (17, 'render_mode', 'summary'),
(19, 'layout_zone', 'sidebar'), (19, 'render_mode', 'summary'),
(20, 'layout_zone', 'sidebar'), (20, 'render_mode', 'summary'),
(3,  'layout_zone', 'sidebar'), (3,  'render_mode', 'summary'),
(4,  'layout_zone', 'sidebar'), (4,  'render_mode', 'summary'),
(5,  'layout_zone', 'sidebar'), (5,  'render_mode', 'summary'),
(6,  'layout_zone', 'sidebar'), (6,  'render_mode', 'summary'),
(7,  'layout_zone', 'sidebar'), (7,  'render_mode', 'summary'),
(10, 'layout_zone', 'sidebar'), (10, 'render_mode', 'summary'),
(22, 'layout_zone', 'sidebar'), (22, 'render_mode', 'summary'),
(25, 'layout_zone', 'sidebar'), (25, 'render_mode', 'summary'),
(29, 'layout_zone', 'sidebar'), (29, 'render_mode', 'summary');

-- ============================
-- Table: oc_agora_groups_inquiries (unchanged)
-- ============================

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id) VALUES
-- Primary assignments
(1,1),
(2,3),
(3,13),
(4,16),
(5,17),
(6,20),
(7,18),
(8,19),
(9,28),
(10,24),
-- Climate program inquiries
(11,1),
(11,16),
(12,16),
(13,1),
(13,16),
-- Digital program inquiries
(14,2),
(14,18),
(15,2),
(15,18),
(16,2),
-- Health program inquiries
(17,31),
(17,42),
(18,42),
-- Geneva assembly
(19,3),
(19,5),
-- Local inquiries
(20,11),
(20,19),
(21,12),
-- Citizen juries
(22,50),
-- Bundle inquiries
(24,47),
(24,6),
-- Referendum inquiries
(25,30),
(25,5),
(26,1),
-- Agricultural program
(29,32),
(29,43);
