-- =======================================================
-- AGORA DEMO DATASET (Switzerland-style hierarchical groups)
-- Corrected with proper owner, family, and access values
-- Converted to PostgreSQL format - FULLY CORRECTED v3
-- =======================================================

-- =======================================================
-- CLEANUP: Remove existing data to avoid duplicates
-- =======================================================

-- First, check if tables exist before truncating
DO $$
BEGIN
    -- Truncate in reverse order of dependencies
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oc_agora_supports') THEN
        TRUNCATE TABLE oc_agora_supports CASCADE;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oc_agora_comments') THEN
        TRUNCATE TABLE oc_agora_comments CASCADE;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oc_agora_inq_misc') THEN
        TRUNCATE TABLE oc_agora_inq_misc CASCADE;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oc_agora_groups_inquiries') THEN
        TRUNCATE TABLE oc_agora_groups_inquiries CASCADE;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oc_agora_inquiries') THEN
        TRUNCATE TABLE oc_agora_inquiries CASCADE;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oc_agora_inq_group') THEN
        TRUNCATE TABLE oc_agora_inq_group CASCADE;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oc_agora_inquiry_group_misc') THEN
        TRUNCATE TABLE oc_agora_inquiry_group_misc CASCADE;
    END IF;
END $$;

-- =======================================================
-- NOTE: If the table oc_agora_inquiry_group_misc doesn't exist,
-- you need to run migrations first. Skip this section if the table is missing.
-- =======================================================

-- ============================
-- Table: oc_agora_inq_group
-- ============================

-- =======================================================
-- COMPLETE GROUP CREATION (WITHOUT SUPPORTS AND COMMENTS)
-- For coherence with InitDbDefault.php
-- =======================================================

-- =======================================================
-- 1. UPDATE allow_edit IN GROUPS
-- =======================================================

UPDATE oc_agora_inq_group SET allow_edit = 1 WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32, 33, 35, 37, 39, 42, 43, 45, 47, 50, 52, 54);
UPDATE oc_agora_inq_group SET allow_edit = 0 WHERE id IN (26, 27, 49);

-- =======================================================
-- 2. UPDATE protected IN GROUPS
-- =======================================================

UPDATE oc_agora_inq_group SET protected = true WHERE id IN (1, 2, 5, 6, 7, 26, 27);

-- =======================================================
-- 3. ADD ALL GROUPS (Original + New)
-- =======================================================

-- === National Programs (root level) ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(1, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*90, 0, 'Climate Action Program 2030', 'program', 'admin', 'National strategy for climate transition and CO2 reduction targets', 'Federal Climate Strategy', 'federal-government', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365*5, '{"budget": "5.2B CHF", "minister": "Simonetta Sommaruga"}'::jsonb, NULL, true, 'active', 1, 'everyone', 'published'),
(2, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*60, 0, 'Digital Switzerland 2025-2030', 'program', 'admin', 'Modernization of digital public services and infrastructure', 'Digital Transformation', 'federal-government', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365*3, '{"budget": "1.8B CHF", "timeline": "2025-2030"}'::jsonb, NULL, true, 'active', 1, 'everyone', 'published'),
(31, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*30, 0, 'Swiss Health Strategy 2030', 'program', 'admin', 'National public health framework and prevention strategy', 'Health 2030', 'federal-government', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365*5, '{"focus": "prevention,mental_health,aging"}'::jsonb, NULL, true, 'active', 1, 'everyone', 'published'),
(32, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*45, 0, 'Agricultural Policy 2022+', 'program', 'admin', 'Sustainable agricultural development and food security', 'AP22+', 'federal-government', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365*7, '{"budget": "3.9B CHF/year", "target": "organic_25%"}'::jsonb, NULL, true, 'active', 1, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- === Assemblies (root level) ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(3, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*180, 0, 'Geneva Citizens Assembly', 'assembly', 'admin', 'General assembly for Geneva residents to deliberate on local issues', 'Assemblée des Citoyens Genève', 'geneva-residents', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365, '{"quorum": 100, "venue": "Palais Eynard"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(4, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*150, 0, 'Bern Citizens Assembly', 'assembly', 'admin', 'General assembly for Bern canton residents', 'Bürgerversammlung Bern', 'bern-residents', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365, '{"quorum": 150, "venue": "Rathaus Bern"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(33, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*120, 0, 'Zürich Cantonal Assembly', 'assembly', 'admin', 'Citizen assembly for Zürich canton', 'Kantonsversammlung Zürich', 'zurich-residents', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365, '{"quorum": 200, "venue": "Kantonsrat Zürich"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- === Cantons (root level) ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(5, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*365, 0, 'Canton Geneva', 'canton', 'admin', 'Swiss canton of Geneva administration and services', 'République et Canton de Genève', 'geneva-government', NULL, '{"capital": "Geneva", "population": 506000, "language": "French"}'::jsonb, NULL, true, 'active', 1, 'everyone', 'published'),
(6, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*365, 0, 'Canton Zürich', 'canton', 'admin', 'Swiss canton of Zürich administration', 'Kanton Zürich', 'zurich-government', NULL, '{"capital": "Zürich", "population": 1528000, "language": "German"}'::jsonb, NULL, true, 'active', 1, 'everyone', 'published'),
(7, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*365, 0, 'Canton Vaud', 'canton', 'admin', 'Swiss canton of Vaud administration', 'Canton de Vaud', 'vaud-government', NULL, '{"capital": "Lausanne", "population": 799000, "language": "French"}'::jsonb, NULL, true, 'active', 1, 'everyone', 'published'),
(35, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*365, 0, 'Canton Bern', 'canton', 'admin', 'Swiss canton of Bern administration', 'Kanton Bern', 'bern-government', NULL, '{"capital": "Bern", "population": 1035000, "language": "German/French"}'::jsonb, NULL, true, 'active', 1, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- === Districts (child of cantons) ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(8, 7, EXTRACT(EPOCH FROM NOW())::bigint - 86400*200, 0, 'District Nyon', 'district', 'admin', 'District inside Canton Vaud covering Nyon region', 'District de Nyon', 'vaud-government', NULL, '{"area": "307 km²", "municipalities": 47}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(9, 6, EXTRACT(EPOCH FROM NOW())::bigint - 86400*200, 0, 'District Winterthur', 'district', 'admin', 'District in Zürich canton centered around Winterthur', 'Bezirk Winterthur', 'zurich-government', NULL, '{"area": "251 km²", "municipalities": 21}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(10, 6, EXTRACT(EPOCH FROM NOW())::bigint - 86400*200, 0, 'District Limmattal', 'district', 'admin', 'District in Zürich canton covering Limmat valley', 'Bezirk Limmattal', 'zurich-government', NULL, '{"area": "142 km²", "municipalities": 13}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(37, 35, EXTRACT(EPOCH FROM NOW())::bigint - 86400*200, 0, 'District Bern-Mittelland', 'district', 'admin', 'Central district of Bern canton', 'Verwaltungskreis Bern-Mittelland', 'bern-government', NULL, '{"area": "947 km²", "municipalities": 74}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- === Communes (child of districts) ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(11, 8, EXTRACT(EPOCH FROM NOW())::bigint - 86400*100, 0, 'Commune Nyon', 'commune', 'admin', 'Municipality in Vaud, district Nyon', 'Ville de Nyon', 'nyon-residents', NULL, '{"postal_code": "1260", "mayor": "Daniel Rossellat", "population": 21200}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(12, 8, EXTRACT(EPOCH FROM NOW())::bigint - 86400*100, 0, 'Commune Prangins', 'commune', 'admin', 'Municipality in Vaud, district Nyon', 'Commune de Prangins', 'prangins-residents', NULL, '{"postal_code": "1197", "mayor": "Pierre-Alain Tschudi", "population": 4200}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(13, 9, EXTRACT(EPOCH FROM NOW())::bigint - 86400*100, 0, 'Commune Winterthur', 'commune', 'admin', 'Municipality in Zürich, district Winterthur', 'Stadt Winterthur', 'winterthur-residents', NULL, '{"postal_code": "8400", "mayor": "Michael Künzle", "population": 114000}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(14, 10, EXTRACT(EPOCH FROM NOW())::bigint - 86400*100, 0, 'Commune Dietikon', 'commune', 'admin', 'Municipality in Zürich, district Limmattal', 'Stadt Dietikon', 'dietikon-residents', NULL, '{"postal_code": "8953", "mayor": "Roger Bachmann", "population": 27700}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(15, 5, EXTRACT(EPOCH FROM NOW())::bigint - 86400*100, 0, 'Commune Geneva', 'commune', 'admin', 'Central municipality of Geneva canton', 'Ville de Genève', 'geneva-residents', NULL, '{"postal_code": "1200", "mayor": "Alfonso Gomez", "population": 203000}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(39, 37, EXTRACT(EPOCH FROM NOW())::bigint - 86400*100, 0, 'Commune Bern', 'commune', 'admin', 'Municipality in Bern, district Bern-Mittelland', 'Stadt Bern', 'bern-residents', NULL, '{"postal_code": "3000", "mayor": "Alec von Graffenried", "population": 134000}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- === Working Groups (various parents) ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(16, 1, EXTRACT(EPOCH FROM NOW())::bigint - 86400*80, 0, 'Energy Transition Working Group', 'working_group', 'admin', 'Energy transition team under Climate Program', 'Energy WG', 'federal-experts', EXTRACT(EPOCH FROM NOW())::bigint + 86400*180, '{"chair": "Dr. Maya Schmidt", "meeting_frequency": "biweekly", "mandate": "energy_policy"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(17, 1, EXTRACT(EPOCH FROM NOW())::bigint - 86400*75, 0, 'Sustainable Mobility Working Group', 'working_group', 'admin', 'Sustainable transport policy development', 'Mobility WG', 'federal-experts', EXTRACT(EPOCH FROM NOW())::bigint + 86400*180, '{"chair": "Prof. Lukas Berger", "meeting_frequency": "monthly", "mandate": "transport_policy"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(18, 2, EXTRACT(EPOCH FROM NOW())::bigint - 86400*70, 0, 'Digital Ethics & Privacy Taskforce', 'working_group', 'admin', 'AI and privacy taskforce for digital transformation', 'Digital Ethics TF', 'federal-experts', EXTRACT(EPOCH FROM NOW())::bigint + 86400*240, '{"chair": "Prof. Anna Weber", "meeting_frequency": "monthly", "mandate": "ai_ethics"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(19, 11, EXTRACT(EPOCH FROM NOW())::bigint - 86400*60, 0, 'Nyon Local Transport Committee', 'working_group', 'admin', 'Local mobility planning in Nyon', 'Transport Committee', 'nyon-council', EXTRACT(EPOCH FROM NOW())::bigint + 86400*90, '{"chair": "Claude Dubois", "meeting_frequency": "monthly", "mandate": "local_transport"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(20, 15, EXTRACT(EPOCH FROM NOW())::bigint - 86400*55, 0, 'Geneva Housing Strategy Group', 'working_group', 'admin', 'Affordable housing strategy development', 'Housing Group', 'geneva-council', EXTRACT(EPOCH FROM NOW())::bigint + 86400*120, '{"chair": "Marie Renaud", "meeting_frequency": "biweekly", "mandate": "housing_policy"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(42, 31, EXTRACT(EPOCH FROM NOW())::bigint - 86400*50, 0, 'Public Health Prevention Working Group', 'working_group', 'admin', 'Disease prevention and health promotion strategies', 'Prevention WG', 'health-experts', EXTRACT(EPOCH FROM NOW())::bigint + 86400*200, '{"chair": "Dr. Thomas Müller", "meeting_frequency": "monthly", "mandate": "prevention"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(43, 32, EXTRACT(EPOCH FROM NOW())::bigint - 86400*50, 0, 'Organic Farming Promotion Group', 'working_group', 'admin', 'Organic agriculture development working group', 'Organic WG', 'agriculture-experts', EXTRACT(EPOCH FROM NOW())::bigint + 86400*200, '{"chair": "Dr. Franz Meyer", "meeting_frequency": "monthly"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- === Commissions (various parents) ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(21, 5, EXTRACT(EPOCH FROM NOW())::bigint - 86400*365, 0, 'Geneva Environmental Commission', 'commission', 'admin', 'Expert committee for ecology and environment in Geneva', 'Commission Environnement GE', 'geneva-experts', NULL, '{"president": "Sarah Klein", "members": 15, "term": "2023-2027"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(22, 7, EXTRACT(EPOCH FROM NOW())::bigint - 86400*365, 0, 'Vaud Finance Commission', 'commission', 'admin', 'Budget supervision and financial oversight for Canton Vaud', 'Commission Finances VD', 'vaud-experts', NULL, '{"president": "Marc Duval", "members": 12, "term": "2023-2027"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(23, 6, EXTRACT(EPOCH FROM NOW())::bigint - 86400*365, 0, 'Zürich Digital Oversight Commission', 'commission', 'admin', 'Public digital systems audit and oversight in Zürich', 'Digitalaufsichtskommission ZH', 'zurich-experts', NULL, '{"president": "Hans Roth", "members": 10, "term": "2024-2028"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(45, 35, EXTRACT(EPOCH FROM NOW())::bigint - 86400*365, 0, 'Bern Tourism Commission', 'commission', 'admin', 'Tourism development and promotion committee', 'Tourismuskommission BE', 'bern-experts', NULL, '{"president": "Erika Steiner", "members": 8, "term": "2023-2027"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- === Bundles (various parents) ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(24, 5, EXTRACT(EPOCH FROM NOW())::bigint - 86400*40, 0, 'Geneva Urban Planning 2025 Bundle', 'bundle', 'admin', 'Package of urban reforms for Geneva development', 'Urban Development Package', 'geneva-planning-dept', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365, '{"theme": "urban_development", "lead_department": "Planning Department"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(25, 7, EXTRACT(EPOCH FROM NOW())::bigint - 86400*35, 0, 'Vaud Mobility Masterplan Bundle', 'bundle', 'admin', 'Transport policy package for Vaud canton', 'Mobility Package VD', 'vaud-transport-dept', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365, '{"theme": "mobility", "lead_department": "Transport Department"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(47, 6, EXTRACT(EPOCH FROM NOW())::bigint - 86400*30, 0, 'Zürich Digital Innovation Bundle', 'bundle', 'admin', 'Digital transformation projects for Zürich', 'Digital Package ZH', 'zurich-digital-dept', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365, '{"theme": "digital_innovation", "lead_department": "Digital Office"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- === Archives ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(26, 5, EXTRACT(EPOCH FROM NOW())::bigint - 86400*730, 0, 'Geneva Closed Inquiries Archive', 'archive', 'admin', 'Archived inquiries for Geneva (2018-2023)', 'Archives Genève', 'geneva-archive', NULL, '{"archivist": "Jean-Luc Martin", "retention_period": "10 years"}'::jsonb, NULL, true, 'active', 0, 'everyone', 'published'),
(27, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*730, 0, 'National Archived Consultations', 'archive', 'admin', 'National archived inquiries (2020-2024)', 'Federal Archives', 'federal-archive', NULL, '{"archivist": "Federal Archives", "retention_period": "permanent"}'::jsonb, NULL, true, 'active', 0, 'everyone', 'published'),
(49, 6, EXTRACT(EPOCH FROM NOW())::bigint - 86400*730, 0, 'Zürich Historical Archive', 'archive', 'admin', 'Closed deliberations from Zürich (2015-2022)', 'Archive Zürich', 'zurich-archive', NULL, '{"archivist": "Markus Fischer", "retention_period": "7 years"}'::jsonb, NULL, true, 'active', 0, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- === Citizen Juries ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(28, 5, EXTRACT(EPOCH FROM NOW())::bigint - 86400*60, 0, 'Geneva Urban Noise Citizen Jury', 'citizen_jury', 'admin', 'Citizens selected to deliberate on urban noise regulations', 'Bruit Urbain Jury', 'geneva-residents', EXTRACT(EPOCH FROM NOW())::bigint + 86400*30, '{"selection_method": "random", "duration": "3 months", "compensation": "yes"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(50, 35, EXTRACT(EPOCH FROM NOW())::bigint - 86400*45, 0, 'Bern Assisted Living Citizen Jury', 'citizen_jury', 'admin', 'Citizen deliberation on elderly care options', 'Alterswohnen Jury', 'bern-residents', EXTRACT(EPOCH FROM NOW())::bigint + 86400*45, '{"selection_method": "stratified_random", "duration": "4 months", "compensation": "yes"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- === Consultation Sets ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(29, 31, EXTRACT(EPOCH FROM NOW())::bigint - 86400*50, 0, 'National Health Strategy Consultations', 'consultation_set', 'admin', 'Series of public health consultations nationwide', 'Health Dialogues', 'federal-health', EXTRACT(EPOCH FROM NOW())::bigint + 86400*180, '{"theme": "public_health", "coordinator": "BAG Participation Unit", "deadline": "2025-06-30"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(52, 1, EXTRACT(EPOCH FROM NOW())::bigint - 86400*40, 0, 'Swiss Energy Future Dialogues', 'consultation_set', 'admin', 'Public dialogues on energy transition pathways', 'Energy Dialogues', 'federal-energy', EXTRACT(EPOCH FROM NOW())::bigint + 86400*150, '{"theme": "energy_transition", "coordinator": "BFE Dialogue Unit", "deadline": "2025-05-31"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- === Referendum Groups ===
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status) VALUES
(30, 5, EXTRACT(EPOCH FROM NOW())::bigint - 86400*90, 0, 'Geneva Parking Regulations Referendum', 'referendum_group', 'admin', 'Referendum on urban parking rules (June 2025)', 'Parking Referendum GE', 'geneva-voters', EXTRACT(EPOCH FROM NOW())::bigint + 86400*60, '{"referendum_date": "2025-06-15", "signatures_required": 10000, "campaign_budget": "150000 CHF"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'),
(54, 6, EXTRACT(EPOCH FROM NOW())::bigint - 86400*80, 0, 'Zürich 30km/h Speed Limit Referendum', 'referendum_group', 'admin', 'Referendum on city-wide speed reduction', 'Tempo-30 Referendum ZH', 'zurich-voters', EXTRACT(EPOCH FROM NOW())::bigint + 86400*75, '{"referendum_date": "2025-07-20", "signatures_required": 15000, "campaign_budget": "200000 CHF"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published')
ON CONFLICT (id) DO NOTHING;

-- =======================================================
-- 4. ADD NEW GROUPS (Additional types for testing)
-- =======================================================

-- Citizen Jury group (type: citizen_jury)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    55, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*60, 0, 'Climate Citizen Jury 2025', 'citizen_jury', 'admin', 'Citizen jury on climate action policies', 'Climate Jury 2025', 'federal-citizens', EXTRACT(EPOCH FROM NOW())::bigint + 86400*90, '{"jury_size": 24, "selection_method": "stratified_sortition", "facilitator": "Dr. Anna Weber"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 55);

-- Initiative Group (type: initiative_group)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    56, 5, EXTRACT(EPOCH FROM NOW())::bigint - 86400*45, 0, 'Geneva Green Initiative', 'initiative_group', 'admin', 'Citizen initiative for green spaces in Geneva', 'Green Initiative GE', 'geneva-citizens', EXTRACT(EPOCH FROM NOW())::bigint + 86400*180, '{"required_signatures": 5000, "collection_deadline": "2026-12-31"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 56);

-- Ethics Review group (type: ethics_review)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    57, 35, EXTRACT(EPOCH FROM NOW())::bigint - 86400*30, 0, 'Bern Ethics Review Board', 'ethics_review', 'admin', 'Review of ethical issues in Bern administration', 'Ethics Board BE', 'bern-ethics', EXTRACT(EPOCH FROM NOW())::bigint + 86400*120, '{"subject": "Administrative Ethics", "status": "open"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 57);

-- Consultation Set group (type: consultation_set)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    58, 31, EXTRACT(EPOCH FROM NOW())::bigint - 86400*25, 0, 'Health Strategy Consultations 2025', 'consultation_set', 'admin', 'Series of public health consultations', 'Health Consultations', 'federal-health', EXTRACT(EPOCH FROM NOW())::bigint + 86400*150, '{"theme": "public_health", "target_audience": "all"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 58);

-- Assembly group (type: assembly)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    59, 33, EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, 0, 'Zürich Cantonal Assembly 2025', 'assembly', 'admin', 'Annual cantonal assembly for Zürich', 'Cantonal Assembly ZH', 'zurich-residents', EXTRACT(EPOCH FROM NOW())::bigint + 86400*60, '{"quorum": 200, "agenda": "Budget, Infrastructure, Education"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 59);

-- Bundle group (type: bundle)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    60, 6, EXTRACT(EPOCH FROM NOW())::bigint - 86400*15, 0, 'Zürich Innovation Bundle 2025', 'bundle', 'admin', 'Digital innovation projects for Zürich', 'Innovation Package', 'zurich-digital', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365, '{"theme": "innovation", "lead_department": "Digital Office"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 60);

-- Poll Group (type: poll_group)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    61, 5, EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, 0, 'Geneva Mobility Poll 2025', 'poll_group', 'admin', 'Public poll on mobility preferences in Geneva', 'Mobility Poll GE', 'geneva-residents', EXTRACT(EPOCH FROM NOW())::bigint + 86400*45, '{"type_of_vote": "score", "scope": "mobility"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 61);

-- Municipal Reports group (type: municipal_reports)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    62, 35, EXTRACT(EPOCH FROM NOW())::bigint - 86400*5, 0, 'Bern Municipal Reports 2025', 'municipal_reports', 'admin', 'Annual municipal reports for Bern', 'Bern Reports', 'bern-government', NULL, '{"year": 2025, "department": "Administration"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 62);

-- =======================================================
-- 5. ADD MISC DATA FOR NEW GROUPS
-- =======================================================

INSERT INTO oc_agora_inq_group_misc (inquiry_group_id, key, value) VALUES
-- Citizen Jury
(55, 'location', 'Bern'),
(55, 'facilitator_id', 'admin'),
(55, 'jury_members', '["test","test2","test3"]'),
(55, 'jury_size', '24'),
(55, 'selection_method', 'stratified_sortition'),

-- Initiative Group
(56, 'location', 'Geneva'),
(56, 'sponsor_ids', '["admin","test2"]'),
(56, 'signatures_collected', '3421'),
(56, 'required_signatures', '5000'),

-- Ethics Review
(57, 'location', 'Bern'),
(57, 'subject', 'Administrative Ethics'),
(57, 'status', 'open'),

-- Consultation Set
(58, 'location', 'Switzerland'),
(58, 'theme', 'public_health'),
(58, 'target_audience', 'all'),

-- Assembly
(59, 'location', 'Zürich'),
(59, 'quorum', '200'),
(59, 'agenda', 'Budget, Infrastructure, Education'),

-- Bundle
(60, 'location', 'Zürich'),
(60, 'theme', 'innovation'),
(60, 'lead_department', 'Digital Office'),

-- Poll Group
(61, 'location', 'Geneva'),
(61, 'type_of_vote', 'score'),
(61, 'scope', 'mobility'),

-- Municipal Reports
(62, 'location', 'Bern'),
(62, 'year', '2025'),
(62, 'department', 'Administration')
ON CONFLICT (inquiry_group_id, key) DO NOTHING;

-- =======================================================
-- 6. ADD GROUP-INQUIRY RELATIONSHIPS
-- =======================================================

-- Original groups relationships (already in the original SQL, adding missing ones)

-- Citizen Jury (55)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 22, 55 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 22 AND group_id = 55);

-- Initiative Group (56)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 6, 56 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 6 AND group_id = 56);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 19, 56 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 19 AND group_id = 56);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 20, 56 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 20 AND group_id = 56);

-- Ethics Review (57)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 4, 57 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 4 AND group_id = 57);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 26, 57 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 26 AND group_id = 57);

-- Consultation Set (58)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 17, 58 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 17 AND group_id = 58);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 18, 58 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 18 AND group_id = 58);

-- Assembly (59)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 2, 59 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 2 AND group_id = 59);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 19, 59 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 19 AND group_id = 59);

-- Bundle (60)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 14, 60 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 14 AND group_id = 60);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 15, 60 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 15 AND group_id = 60);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 16, 60 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 16 AND group_id = 60);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 24, 60 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 24 AND group_id = 60);

-- Poll Group (61)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 25, 61 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 25 AND group_id = 61);

-- Municipal Reports (62)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 16, 62 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 16 AND group_id = 62);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 26, 62 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 26 AND group_id = 62);

-- =======================================================
-- 7. ADD ADDITIONAL INQUIRIES FOR NEW GROUPS
-- =======================================================

-- Inquiry for Citizen Jury (55) - deliberation
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1001, NULL, 'deliberation', 'Climate Action: Citizen Jury Deliberation', 'Citizen jury deliberation on climate action policies for Switzerland 2030.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*30, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*60, 0, 'federal-citizens', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*5, NULL, 'accepted', 'active', 1, 'deliberative', 'majority_judgment'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1001);

-- Inquiry for Initiative Group (56) - initiative
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1002, NULL, 'initiative', 'Geneva Green Roofs Initiative', 'Citizen initiative to require green roofs on all new buildings in Geneva.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*120, 0, 'geneva-citizens', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*3, NULL, 'accepted', 'active', 1, 'deliberative', 'approval_delib'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1002);

-- Inquiry for Ethics Review (57) - official
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1003, NULL, 'official', 'Ethics Review: Bern Administrative Conduct', 'Official ethics review of administrative conduct in Bern.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*15, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*90, 0, 'bern-ethics', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*2, NULL, 'accepted', 'active', 1, 'official', 'none'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1003);

-- Inquiry for Consultation Set (58) - consultation
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1004, NULL, 'consultation', 'Mental Health Prevention Consultation', 'Public consultation on mental health prevention programs for 2026-2030.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*45, 0, 'federal-health', 'everyone', 'published', 'after_vote', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 1, 'collective', 'ternary'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1004);

-- Inquiry for Assembly (59) - assembly
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1005, NULL, 'assembly', 'Zürich Cantonal Assembly: Education Reform', 'Assembly debate on education reform in Zürich canton.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*8, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*30, 0, 'zurich-residents', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 1, 'collective', 'binary'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1005);

-- Inquiry for Bundle (60) - proposal
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1006, NULL, 'proposal', 'AI Governance Framework for Zürich', 'Proposal for AI governance and regulation in Zürich public services.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*5, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*180, 0, 'zurich-digital', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 1, 'deliberative', 'reaction'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1006);

-- Inquiry for Poll Group (61) - poll
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1007, NULL, 'poll', 'Geneva Mobility Preferences Poll', 'Public poll on mobility preferences in Geneva for 2026 budget planning.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*3, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*30, 0, 'geneva-residents', 'everyone', 'published', 'after_vote', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 1, 'collective', 'score'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1007);

-- Inquiry for Municipal Reports (62) - report
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1008, NULL, 'report', 'Bern Municipal Report 2025: Infrastructure', 'Annual municipal report on infrastructure projects in Bern.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*2, 0, 0, 0, 'bern-government', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'published', 1, 'official', 'none'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1008);

-- =======================================================
-- 8. ADD GROUP-INQUIRY RELATIONSHIPS FOR NEW INQUIRIES
-- =======================================================

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1001, 55 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1001 AND group_id = 55);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1002, 56 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1002 AND group_id = 56);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1003, 57 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1003 AND group_id = 57);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1004, 58 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1004 AND group_id = 58);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1005, 59 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1005 AND group_id = 59);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1006, 60 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1006 AND group_id = 60);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1007, 61 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1007 AND group_id = 61);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1008, 62 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1008 AND group_id = 62);

-- =======================================================
-- 9. ADD MISC DATA FOR NEW INQUIRIES
-- =======================================================

INSERT INTO oc_agora_inq_misc (inquiry_id, key, value) VALUES
(1001, 'meeting_date', '2026-09-15'),
(1001, 'meeting_time', '10:00'),
(1001, 'meeting_location', 'Bern Federal Building'),
(1001, 'facilitator', 'Dr. Anna Weber'),
(1001, 'layout_zone', 'main'),
(1001, 'render_mode', 'full'),
(1001, 'grades', '["Reject","Insufficient","Passable","Fairly_Good","Good","Very_Good","Excellent"]'),

(1002, 'layout_zone', 'sidebar'),
(1002, 'render_mode', 'summary'),
(1002, 'initiative_scope', 'municipal'),
(1002, 'quorum', '5000'),
(1002, 'min_choices', '1'),
(1002, 'max_choices', '3'),

(1003, 'layout_zone', 'main'),
(1003, 'render_mode', 'full'),
(1003, 'official_reference', 'BE-2025-045'),

(1004, 'consultation_start', '2026-08-01'),
(1004, 'consultation_end', '2026-10-31'),
(1004, 'layout_zone', 'sidebar'),
(1004, 'render_mode', 'summary'),
(1004, 'allow_abstain', 'true'),

(1005, 'meeting_date', '2026-09-20'),
(1005, 'meeting_time', '14:00'),
(1005, 'meeting_location', 'Kantonsrat Zürich'),
(1005, 'layout_zone', 'main'),
(1005, 'render_mode', 'cards'),
(1005, 'allow_abstain', 'false'),

(1006, 'layout_zone', 'sidebar'),
(1006, 'render_mode', 'summary'),
(1006, 'ai_governance_level', 'public'),
(1006, 'allowed_reactions', '["👍","❤️","🎉","🤔","👎"]'),
(1006, 'max_per_user', '3'),

(1007, 'voting_start', '2026-09-01'),
(1007, 'voting_end', '2026-09-30'),
(1007, 'poll_method', 'score'),
(1007, 'layout_zone', 'main'),
(1007, 'render_mode', 'cards'),
(1007, 'score_min', '0'),
(1007, 'score_max', '10'),
(1007, 'score_step', '1'),

(1008, 'report_year', '2025'),
(1008, 'report_department', 'Infrastructure'),
(1008, 'layout_zone', 'footer'),
(1008, 'render_mode', 'cards')
ON CONFLICT (inquiry_id, key) DO NOTHING;

-- ============================
-- Table: oc_agora_inquiry_group_misc
-- ============================
-- This table may not exist if migrations haven't been run.
-- Skip this section if the table doesn't exist.

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oc_agora_inquiry_group_misc') THEN
        INSERT INTO oc_agora_inquiry_group_misc (inquiry_group_id, key, value) VALUES
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
        (19, 'location', 'Switzerland'),
        (20, 'location', 'Nyon'),
        (21, 'location', 'Geneva'),
        (22, 'location', 'Vaud'),
        (23, 'location', 'Zürich'),
        (24, 'location', 'Geneva'),
        (25, 'location', 'Vaud'),
        (26, 'location', 'Geneva'),
        (27, 'location', 'Switzerland'),
        (28, 'location', 'Geneva'),
        (29, 'location', 'Switzerland'),
        (30, 'location', 'Geneva'),
        (31, 'location', 'Switzerland'),
        (32, 'location', 'Switzerland'),
        (33, 'location', 'Zürich'),
        (35, 'location', 'Bern'),
        (37, 'location', 'Bern-Mittelland'),
        (39, 'location', 'Bern'),
        (42, 'location', 'Switzerland'),
        (43, 'location', 'Switzerland'),
        (45, 'location', 'Bern'),
        (47, 'location', 'Zürich'),
        (49, 'location', 'Zürich'),
        (50, 'location', 'Bern'),
        (52, 'location', 'Switzerland'),
        (54, 'location', 'Zürich'),

        -- Additional metadata
        (1, 'language', 'de,fr,it,rm'),
        (5, 'language', 'fr'),
        (6, 'language', 'de'),
        (7, 'language', 'fr'),
        (28, 'juror_count', '25'),
        (28, 'meeting_dates', '2025-03-15,2025-03-29,2025-04-12'),
        (30, 'referendum_number', 'GE-2025-045'),
        (54, 'referendum_number', 'ZH-2025-128')
        ON CONFLICT (inquiry_group_id, key) DO NOTHING;
    END IF;
END $$;

-- ============================
-- Table: oc_agora_inquiries
-- ============================
-- Replaced 'access' with 'visibility' and 'publication_status'
-- visibility values: 'everyone', 'private', 'groups', 'users'
-- publication_status values: 'draft', 'pending', 'published', 'archived'

INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family) VALUES
-- Climate Program Inquiries
(1, NULL, 'news', 'Federal Council Adopts New Climate Measures', 'Switzerland updates its climate targets for 2030 with stricter CO2 reduction goals for buildings and transport sectors.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, 0, 0, 0, 'federal-government', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*5, NULL, 'accepted', 'published', 1, 'collective'),
(11, NULL, 'consultation', 'Public Consultation: Renewable Energy Expansion 2025-2030', 'Seeking public input on solar and wind energy development targets and support programs for the next 5 years.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*15, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*45, 0, 'federal-energy', 'everyone', 'published', 'after_vote', EXTRACT(EPOCH FROM NOW())::bigint - 86400*2, NULL, 'accepted', 'active', 1, 'deliberative'),
(12, NULL, 'meeting', 'Energy Working Group Q1 Meeting: Implementation Review', 'Quarterly meeting to discuss implementation progress of energy transition measures and budget allocation.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*5, 0, 'federal-experts', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 1, 'deliberative'),
(13, NULL, 'proposal', 'Proposal: Carbon Tax Revenues Allocation Framework', 'Detailed proposal on how to allocate revenues from CO2 levy between climate fund, population redistribution, and innovation programs.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*5, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*60, 0, 'federal-government', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 1, 'deliberative'),

-- Digital Program Inquiries
(14, NULL, 'consultation', 'Swiss Digital ID Public Consultation', 'Public feedback on the proposed Swiss Digital Identity system: features, privacy safeguards, and implementation timeline.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*25, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*30, 0, 'federal-digital', 'everyone', 'published', 'after_vote', EXTRACT(EPOCH FROM NOW())::bigint - 86400*3, NULL, 'accepted', 'active', 1, 'deliberative'),
(15, NULL, 'deliberation', 'AI Regulation Framework Expert Debate', 'Structured expert debate on AI governance, risk classification, and regulatory approaches for Switzerland.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*15, 0, 'federal-experts', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*2, NULL, 'accepted', 'active', 1, 'deliberative'),
(16, NULL, 'announcement', 'New Public API Platform Launch: api.admin.ch', 'Federal administration opens new API platform for developers to access public data and services.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*12, 0, 0, 0, 'federal-digital', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'published', 1, 'collective'),

-- Health Program Inquiries
(17, NULL, 'consultation', 'Mental Health Strategy 2025-2030: Public Input', 'Public consultation on new mental health services framework, prevention programs, and support systems.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*22, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*40, 0, 'federal-health', 'everyone', 'published', 'after_vote', EXTRACT(EPOCH FROM NOW())::bigint - 86400*4, NULL, 'accepted', 'active', 1, 'deliberative'),
(18, NULL, 'meeting', 'Prevention Working Group: Monthly Strategy Session', 'Monthly working group session to develop prevention programs for non-communicable diseases.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*8, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*2, 0, 'health-experts', 'everyone', 'published', 'never', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 0, 'deliberative'),

-- Geneva Citizen Assembly
(2, NULL, 'meeting', 'Geneva Citizens Assembly: Annual Budget Deliberation 2026', 'Geneva residents invited to discuss and provide input on the 2026 municipal budget priorities.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*35, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*10, 0, 'geneva-residents', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*6, NULL, 'accepted', 'active', 1, 'deliberative'),
(19, NULL, 'deliberation', 'Urban Development Projects: Public Debate', 'Citizens debate major construction projects including new housing, parks, and infrastructure.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*12, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*20, 0, 'geneva-residents', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*3, NULL, 'accepted', 'active', 1, 'deliberative'),

-- Local Commune Inquiries
(3, NULL, 'consultation', 'Winterthur Bike Lane Expansion: Route Planning', 'Public consultation on new bike infrastructure including protected lanes and parking facilities.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*28, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*15, 0, 'winterthur-residents', 'everyone', 'published', 'after_vote', EXTRACT(EPOCH FROM NOW())::bigint - 86400*2, NULL, 'accepted', 'active', 1, 'deliberative'),
(20, NULL, 'proposal', 'Nyon Pedestrian Zone Extension Proposal', 'Proposal to expand car-free zone in city center to include Rue de Rive and improve public spaces.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*25, 0, 'nyon-residents', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*4, NULL, 'accepted', 'active', 1, 'deliberative'),
(21, NULL, 'meeting', 'Prangins Town Hall: Monthly Commune Meeting', 'Monthly commune meeting open to all residents for local matters and announcements.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*5, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*1, 0, 'prangins-residents', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 1, 'deliberative'),

-- Working Group Inquiries
(4, NULL, 'proposal', 'Solar Panel Subsidy Program Revision', 'Proposal for updated residential solar incentives including battery storage support.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*25, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*35, 0, 'federal-experts', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*3, NULL, 'accepted', 'active', 1, 'deliberative'),
(5, NULL, 'announcement', 'New Mobility Rules for E-Scooters and Bikes', 'Updated regulations for micromobility devices including parking zones and speed limits.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*22, 0, 0, 0, 'federal-experts', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'published', 0, 'collective'),
(6, NULL, 'consultation', 'Geneva Affordable Housing Strategy 2025-2030', 'Public input on new housing policies including rent control, social housing quotas, and construction targets.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*15, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*30, 0, 'geneva-residents', 'everyone', 'published', 'after_vote', EXTRACT(EPOCH FROM NOW())::bigint - 86400*2, NULL, 'accepted', 'active', 1, 'deliberative'),
(7, NULL, 'deliberation', 'Digital Privacy Standards: Technical Debate', 'Technical debate on data protection standards for public digital services.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*14, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*10, 0, 'federal-experts', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*2, NULL, 'accepted', 'active', 1, 'deliberative'),
(8, NULL, 'meeting', 'Nyon Transport Committee: Monthly Mobility Meeting', 'Monthly mobility committee meeting to discuss local transport issues and projects.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*5, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*2, 0, 'nyon-council', 'everyone', 'published', 'never', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 0, 'deliberative'),

-- Citizen Jury Inquiries
(9, NULL, 'news', 'Urban Noise Pollution: Citizen Jury Findings Published', 'Findings and recommendations from the citizen jury deliberation on urban noise regulations.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*8, 0, 0, 0, 'geneva-residents', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'published', 1, 'collective'),
(22, NULL, 'deliberation', 'Assisted Living Options: Citizen Jury Deliberation', 'Citizen jury evaluates different elderly care models and makes recommendations.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*12, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*20, 0, 'bern-residents', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*3, NULL, 'accepted', 'active', 1, 'deliberative'),

-- Bundle Inquiries
(10, NULL, 'proposal', 'Green Urban Planning 2025: Comprehensive Development', 'Comprehensive urban development proposal including green spaces, mixed-use zoning, and sustainable construction.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*7, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*40, 0, 'geneva-planning-dept', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*2, NULL, 'accepted', 'active', 1, 'deliberative'),
(24, NULL, 'meeting', 'Zürich Digital Projects Review Meeting', 'Quarterly review of ongoing digital transformation projects and budget allocation.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*3, 0, 'zurich-digital-dept', 'everyone', 'published', 'never', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 0, 'deliberative'),

-- Referendum Inquiries
(25, NULL, 'consultation', 'Pre-Referendum: Geneva Parking Regulations Review', 'Information session and public feedback collection before the parking referendum vote.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*22, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*10, 0, 'geneva-voters', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*4, NULL, 'accepted', 'active', 1, 'deliberative'),
(26, NULL, 'news', 'Federal CO2 Levy Referendum Date Set for September 2025', 'Official announcement: Federal referendum on carbon pricing increase scheduled for September 28, 2025.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, 0, 0, 0, 'swiss-voters', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*2, NULL, 'accepted', 'published', 1, 'collective'),

-- Agricultural Program
(29, NULL, 'consultation', 'Organic Farming Support Programs 2026-2030', 'Public input on organic agriculture subsidy programs and transition support.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*12, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*25, 0, 'farmers-association', 'everyone', 'published', 'after_vote', EXTRACT(EPOCH FROM NOW())::bigint - 86400*3, NULL, 'accepted', 'active', 1, 'deliberative')
ON CONFLICT (id) DO NOTHING;

-- ============================
-- Table: oc_agora_inq_misc (extended with layout_zone & render_mode)
-- ============================

INSERT INTO oc_agora_inq_misc (inquiry_id, key, value) VALUES
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

-- ===========================================
-- NEW automatic layout + render_mode entries
-- ===========================================

-- NEWS (footer + cards)
(1,  'layout_zone', 'footer'), (1,  'render_mode', 'cards'),
(9,  'layout_zone', 'footer'), (9,  'render_mode', 'cards'),
(26, 'layout_zone', 'footer'), (26, 'render_mode', 'cards'),

-- MEETING (main + cards)
(12, 'layout_zone', 'main'), (12, 'render_mode', 'cards'),
(2,  'layout_zone', 'main'), (2,  'render_mode', 'cards'),
(18, 'layout_zone', 'main'), (18, 'render_mode', 'cards'),
(21, 'layout_zone', 'main'), (21, 'render_mode', 'cards'),
(8,  'layout_zone', 'main'), (8,  'render_mode', 'cards'),
(24, 'layout_zone', 'main'), (24, 'render_mode', 'cards'),

-- ALL OTHER TYPES (sidebar + summary)
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
(29, 'layout_zone', 'sidebar'), (29, 'render_mode', 'summary')
ON CONFLICT (inquiry_id, key) DO NOTHING;

-- ============================
-- Table: oc_agora_groups_inquiries
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
(29,43)
ON CONFLICT (inquiry_id, group_id) DO NOTHING;

-- ============================
-- Agora Sample Data (Switzerland Edition)
-- ============================

-- Inquiries
INSERT INTO oc_agora_inquiries
(id, cover_id, type, title, description, location_id, category_id, owner,
 created, archived, expire, deleted, owned_group, visibility, publication_status, show_results,
 last_interaction, parent_id, moderation_status, inquiry_status,
 allow_comment, family)
VALUES
-- 5001 — Genève / Mobilité douce
(5001, NULL, 'proposal',
 'Créer plus de pistes cyclables à Genève',
 'Extension du réseau cyclable entre Plainpalais et Cornavin.',
 101, 6, 'admin',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*200, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*160, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*190, NULL,
 'accepted', 'active', 1, 'deliberative'),

-- 5002 — Zürich / Débat
(5002, NULL, 'debate',
 'Limiter le trafic automobile au centre de Zürich',
 'Faut-il interdire les voitures dans la vieille ville ?',
 102, 11, 'moderator',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*150, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*120, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*145, NULL,
 'accepted', 'active', 1, 'deliberative'),

-- 5003 — Lausanne / Projet solaire
(5003, NULL, 'project',
 'Installation de panneaux solaires sur les écoles de Lausanne',
 'Projet de transition énergétique soutenu par la commune.',
 103, 5, 'test',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*100, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*200, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*95, NULL,
 'accepted', 'active', 1, 'deliberative'),

-- 5004 — Nyon / Pétition
(5004, NULL, 'petition',
 'Protéger la rive du lac à Nyon',
 'Interdire les constructions privées sur la zone littorale.',
 104, 2, 'test2',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*80, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*60, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*75, NULL,
 'accepted', 'active', 1, 'deliberative'),

-- 5005 — Berne / Grief
(5005, NULL, 'grievance',
 'Bruit excessif aux abords de la gare de Berne',
 'Plainte concernant le trafic de nuit.',
 105, 23, 'test3',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*60, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*120, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*55, NULL,
 'accepted', 'active', 1, 'deliberative'),

-- 5006 — Lausanne / Suggestion liée
(5006, NULL, 'suggestion',
 'Installer des parois anti-bruit',
 'Suggestion liée à la plainte 5005.',
 103, 6, 'admin',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*55, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*100, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*50, 5005,
 'accepted', 'active', 1, 'deliberative'),

-- 5007 — Genève / Communauté
(5007, NULL, 'proposal',
 'Planter 2''000 arbres à Genève',
 'Plan de reforestation urbaine.',
 101, 9, 'moderator',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*40, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*200, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*35, NULL,
 'accepted', 'active', 1, 'deliberative'),

-- 5008 — Réponse officielle (Genève)
(5008, NULL, 'official',
 'Réponse officielle : Arbres à Genève',
 'Le service des espaces verts soutient le projet.',
 101, 9, 'official',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*38, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*120, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*37, 5007,
 'accepted', 'active', 1, 'deliberative'),

-- 5009 — Winterthur / Jardin communautaire
(5009, NULL, 'project',
 'Créer un jardin partagé à Winterthur',
 'Espace vert ouvert géré par les habitants.',
 106, 17, 'test',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*30, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*200, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*25, NULL,
 'accepted', 'active', 1, 'deliberative'),

-- 5010 — Suggestion liée
(5010, NULL, 'proposal',
 'Installer une serre permaculture',
 'Extension du projet 5009.',
 106, 4, 'test2',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*28, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*150, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*25, 5009,
 'accepted', 'active', 1, 'deliberative'),

-- 5011 — Berne / Transport
(5011, NULL, 'grievance',
 'Retards récurrents des bus bernois',
 'Nombreuses plaintes depuis l''automne.',
 105, 9, 'test3',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*27, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*90, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*26, NULL,
 'accepted', 'active', 1, 'deliberative'),

-- 5012 — Suggestion bus GPS
(5012, NULL, 'suggestion',
 'Ajouter un système GPS aux bus',
 'Suggestion liée à la plainte 5011.',
 105, 9, 'admin',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*26, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*100, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*25, 5011,
 'accepted', 'active', 1, 'deliberative'),

-- 5013 — Zürich / Jet-skis
(5013, NULL, 'petition',
 'Interdire les jet-skis sur le lac de Zürich',
 'Réduction du bruit et protection du lac.',
 102, 3, 'moderator',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*24, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*60, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*22, NULL,
 'accepted', 'active', 1, 'deliberative'),

-- 5014 — Vaud / École
(5014, NULL, 'debate',
 'Faut-il prolonger les heures d''école dans le canton de Vaud ?',
 'Débat public sur la conciliation travail-famille.',
 103, 26, 'test',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*90, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, NULL,
 'accepted', 'active', 1, 'deliberative'),

-- 5015 — Genève / Écologie
(5015, NULL, 'proposal',
 'Toitures végétalisées pour les bâtiments publics',
 'Projet de verdissement urbain.',
 101, 2, 'test2',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*15, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*200, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*14, NULL,
 'accepted', 'active', 1, 'deliberative'),

-- 5016 — Réponse officielle toits verts
(5016, NULL, 'official',
 'Réponse officielle : Toitures végétalisées',
 'Projet accepté en phase d''étude.',
 101, 2, 'official',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*14, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*120, 0, '',
 'everyone', 'published', 'always',
 EXTRACT(EPOCH FROM NOW())::bigint - 86400*13, 5015,
 'accepted', 'active', 1, 'deliberative')
ON CONFLICT (id) DO NOTHING;

-- ============================
-- Table: oc_agora_comments
-- ============================

-- =======================================================
-- ADDITIONAL DATA FOR COHERENCE WITH InitDbDefault.php
-- VERSION: WITH COMMENTS AND SUPPORTS (using only valid SupportFeature)
-- =======================================================

-- =======================================================
-- 1. UPDATE allow_edit IN GROUPS (cast to boolean/int)
-- =======================================================

UPDATE oc_agora_inq_group SET allow_edit = 1 WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32, 33, 35, 37, 39, 42, 43, 45, 47, 50, 52, 54);
UPDATE oc_agora_inq_group SET allow_edit = 0 WHERE id IN (26, 27, 49);

-- =======================================================
-- 2. UPDATE protected IN GROUPS
-- =======================================================

UPDATE oc_agora_inq_group SET protected = true WHERE id IN (1, 2, 5, 6, 7, 26, 27);

-- =======================================================
-- 3. UPDATE support_feature ON INQUIRIES (using only valid SupportFeature)
-- =======================================================

-- Valid SupportFeature: binary, ternary, reaction, star, score, majority_judgment, approval_delib, none

-- Climate Program inquiries - using binary
UPDATE oc_agora_inquiries SET support_feature = 'binary' WHERE id IN (1, 2, 11, 12, 13, 17, 18);

-- Digital Program inquiries - using score
UPDATE oc_agora_inquiries SET support_feature = 'score' WHERE id IN (14, 15);

-- Announcement - no support
UPDATE oc_agora_inquiries SET support_feature = 'none' WHERE id IN (16);

-- Geneva Assembly inquiries - using binary
UPDATE oc_agora_inquiries SET support_feature = 'binary' WHERE id IN (3, 4, 19, 21, 22);

-- Local inquiries - using reaction
UPDATE oc_agora_inquiries SET support_feature = 'reaction' WHERE id IN (5, 6, 7, 8, 20);

-- Citizen Jury - using majority_judgment
UPDATE oc_agora_inquiries SET support_feature = 'majority_judgment' WHERE id IN (9, 28);

-- Referendum - using ternary
UPDATE oc_agora_inquiries SET support_feature = 'ternary' WHERE id IN (25, 26, 30);

-- Agricultural - using approval_delib
UPDATE oc_agora_inquiries SET support_feature = 'approval_delib' WHERE id IN (29);

-- Sample inquiries - diverse support features
UPDATE oc_agora_inquiries SET support_feature = 'binary' WHERE id IN (5001, 5004, 5007, 5013, 5014);
UPDATE oc_agora_inquiries SET support_feature = 'score' WHERE id IN (5003, 5006, 5009, 5010, 5012, 5015);
UPDATE oc_agora_inquiries SET support_feature = 'reaction' WHERE id IN (5002, 5011);
UPDATE oc_agora_inquiries SET support_feature = 'none' WHERE id IN (5005, 5008, 5016);

-- =======================================================
-- 4. ADD MISC DATA TO INQUIRIES (support configuration)
-- =======================================================

INSERT INTO oc_agora_inq_misc (inquiry_id, key, value) VALUES
-- Score engine configs
(14, 'score_min', '0'),
(14, 'score_max', '10'),
(14, 'score_step', '1'),
(15, 'score_min', '0'),
(15, 'score_max', '10'),
(15, 'score_step', '1'),
(5003, 'score_min', '0'),
(5003, 'score_max', '10'),
(5003, 'score_step', '1'),
(5006, 'score_min', '0'),
(5006, 'score_max', '10'),
(5006, 'score_step', '1'),
(5009, 'score_min', '1'),
(5009, 'score_max', '5'),
(5009, 'score_step', '1'),
(5010, 'score_min', '1'),
(5010, 'score_max', '5'),
(5010, 'score_step', '1'),
(5012, 'score_min', '0'),
(5012, 'score_max', '10'),
(5012, 'score_step', '1'),
(5015, 'score_min', '1'),
(5015, 'score_max', '5'),
(5015, 'score_step', '1'),

-- Reaction engine configs
(5002, 'allowed_reactions', '["👍","❤️","🎉","🤔","👎"]'),
(5002, 'max_per_user', '3'),
(5011, 'allowed_reactions', '["👍","👎","❤️"]'),
(5011, 'max_per_user', '2'),

-- Majority Judgment configs
(9, 'grades', '["Reject","Insufficient","Passable","Fairly_Good","Good","Very_Good","Excellent"]'),
(28, 'grades', '["Reject","Passable","Fair","Good","Excellent"]'),

-- Approval Delib configs
(29, 'min_choices', '1'),
(29, 'max_choices', '3'),

-- Ternary configs
(25, 'allow_abstain', 'true'),
(26, 'allow_abstain', 'true'),
(30, 'allow_abstain', 'true'),

-- Binary configs (just for completeness)
(1, 'allow_abstain', 'false'),
(2, 'allow_abstain', 'false'),
(11, 'allow_abstain', 'false'),
(12, 'allow_abstain', 'false'),
(13, 'allow_abstain', 'false'),
(17, 'allow_abstain', 'false'),
(18, 'allow_abstain', 'false'),
(5001, 'allow_abstain', 'false'),
(5004, 'allow_abstain', 'false'),
(5007, 'allow_abstain', 'false'),
(5013, 'allow_abstain', 'false'),
(5014, 'allow_abstain', 'false'),

-- Additional layout configs
(1, 'layout_zone', 'footer'),
(1, 'render_mode', 'cards'),
(2, 'layout_zone', 'main'),
(2, 'render_mode', 'cards'),
(11, 'layout_zone', 'sidebar'),
(11, 'render_mode', 'summary'),
(14, 'layout_zone', 'sidebar'),
(14, 'render_mode', 'summary'),
(17, 'layout_zone', 'sidebar'),
(17, 'render_mode', 'summary'),
(25, 'layout_zone', 'sidebar'),
(25, 'render_mode', 'summary')
ON CONFLICT (inquiry_id, key) DO NOTHING;

-- =======================================================
-- 5. ADD ADDITIONAL GROUPS FOR TESTING GROUP TYPES
-- =======================================================

-- Citizen Jury group (type: citizen_jury)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    55, NULL, EXTRACT(EPOCH FROM NOW())::bigint - 86400*60, 0, 'Climate Citizen Jury 2025', 'citizen_jury', 'admin', 'Citizen jury on climate action policies', 'Climate Jury 2025', 'federal-citizens', EXTRACT(EPOCH FROM NOW())::bigint + 86400*90, '{"jury_size": 24, "selection_method": "stratified_sortition", "facilitator": "Dr. Anna Weber"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 55);

-- Initiative Group (type: initiative_group)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    56, 5, EXTRACT(EPOCH FROM NOW())::bigint - 86400*45, 0, 'Geneva Green Initiative', 'initiative_group', 'admin', 'Citizen initiative for green spaces in Geneva', 'Green Initiative GE', 'geneva-citizens', EXTRACT(EPOCH FROM NOW())::bigint + 86400*180, '{"required_signatures": 5000, "collection_deadline": "2026-12-31"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 56);

-- Ethics Review group (type: ethics_review)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    57, 35, EXTRACT(EPOCH FROM NOW())::bigint - 86400*30, 0, 'Bern Ethics Review Board', 'ethics_review', 'admin', 'Review of ethical issues in Bern administration', 'Ethics Board BE', 'bern-ethics', EXTRACT(EPOCH FROM NOW())::bigint + 86400*120, '{"subject": "Administrative Ethics", "status": "open"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 57);

-- Consultation Set group (type: consultation_set)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    58, 31, EXTRACT(EPOCH FROM NOW())::bigint - 86400*25, 0, 'Health Strategy Consultations 2025', 'consultation_set', 'admin', 'Series of public health consultations', 'Health Consultations', 'federal-health', EXTRACT(EPOCH FROM NOW())::bigint + 86400*150, '{"theme": "public_health", "target_audience": "all"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 58);

-- Assembly group (type: assembly)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    59, 33, EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, 0, 'Zürich Cantonal Assembly 2025', 'assembly', 'admin', 'Annual cantonal assembly for Zürich', 'Cantonal Assembly ZH', 'zurich-residents', EXTRACT(EPOCH FROM NOW())::bigint + 86400*60, '{"quorum": 200, "agenda": "Budget, Infrastructure, Education"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 59);

-- Bundle group (type: bundle)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    60, 6, EXTRACT(EPOCH FROM NOW())::bigint - 86400*15, 0, 'Zürich Innovation Bundle 2025', 'bundle', 'admin', 'Digital innovation projects for Zürich', 'Innovation Package', 'zurich-digital', EXTRACT(EPOCH FROM NOW())::bigint + 86400*365, '{"theme": "innovation", "lead_department": "Digital Office"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 60);

-- Poll Group (type: poll_group)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    61, 5, EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, 0, 'Geneva Mobility Poll 2025', 'poll_group', 'admin', 'Public poll on mobility preferences in Geneva', 'Mobility Poll GE', 'geneva-residents', EXTRACT(EPOCH FROM NOW())::bigint + 86400*45, '{"type_of_vote": "score", "scope": "mobility"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 61);

-- Municipal Reports group (type: municipal_reports)
INSERT INTO oc_agora_inq_group (id, parent_id, created, deleted, title, type, owner, description, title_ext, owned_group, expire, metadata, cover_id, protected, group_status, allow_edit, visibility, publication_status)
SELECT 
    62, 35, EXTRACT(EPOCH FROM NOW())::bigint - 86400*5, 0, 'Bern Municipal Reports 2025', 'municipal_reports', 'admin', 'Annual municipal reports for Bern', 'Bern Reports', 'bern-government', NULL, '{"year": 2025, "department": "Administration"}'::jsonb, NULL, false, 'active', 1, 'everyone', 'published'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inq_group WHERE id = 62);

-- =======================================================
-- 6. ADD MISC DATA FOR NEW GROUPS (using oc_agora_inquiry_group_misc)
-- =======================================================

INSERT INTO oc_agora_inquiry_group_misc (inquiry_group_id, key, value) VALUES
-- Citizen Jury
(55, 'location', 'Bern'),
(55, 'facilitator_id', 'admin'),
(55, 'jury_members', '["test","test2","test3"]'),
(55, 'jury_size', '24'),
(55, 'selection_method', 'stratified_sortition'),

-- Initiative Group
(56, 'location', 'Geneva'),
(56, 'sponsor_ids', '["admin","test2"]'),
(56, 'signatures_collected', '3421'),
(56, 'required_signatures', '5000'),

-- Ethics Review
(57, 'location', 'Bern'),
(57, 'subject', 'Administrative Ethics'),
(57, 'status', 'open'),

-- Consultation Set
(58, 'location', 'Switzerland'),
(58, 'theme', 'public_health'),
(58, 'target_audience', 'all'),

-- Assembly
(59, 'location', 'Zürich'),
(59, 'quorum', '200'),
(59, 'agenda', 'Budget, Infrastructure, Education'),

-- Bundle
(60, 'location', 'Zürich'),
(60, 'theme', 'innovation'),
(60, 'lead_department', 'Digital Office'),

-- Poll Group
(61, 'location', 'Geneva'),
(61, 'type_of_vote', 'score'),
(61, 'scope', 'mobility'),

-- Municipal Reports
(62, 'location', 'Bern'),
(62, 'year', '2025'),
(62, 'department', 'Administration')
ON CONFLICT (inquiry_group_id, key) DO NOTHING;

-- =======================================================
-- 7. ADD GROUP-INQUIRY RELATIONSHIPS
-- =======================================================

-- Citizen Jury (55)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 22, 55 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 22 AND group_id = 55);

-- Initiative Group (56)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 6, 56 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 6 AND group_id = 56);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 19, 56 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 19 AND group_id = 56);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 20, 56 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 20 AND group_id = 56);

-- Ethics Review (57)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 4, 57 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 4 AND group_id = 57);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 26, 57 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 26 AND group_id = 57);

-- Consultation Set (58)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 17, 58 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 17 AND group_id = 58);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 18, 58 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 18 AND group_id = 58);

-- Assembly (59)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 2, 59 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 2 AND group_id = 59);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 19, 59 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 19 AND group_id = 59);

-- Bundle (60)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 14, 60 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 14 AND group_id = 60);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 15, 60 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 15 AND group_id = 60);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 16, 60 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 16 AND group_id = 60);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 24, 60 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 24 AND group_id = 60);

-- Poll Group (61)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 25, 61 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 25 AND group_id = 61);

-- Municipal Reports (62)
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 16, 62 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 16 AND group_id = 62);
INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 26, 62 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 26 AND group_id = 62);

-- =======================================================
-- 8. ADD COMMENTS (oc_agora_comments)
-- =======================================================

INSERT INTO oc_agora_comments (inquiry_id, user_id, comment, timestamp, deleted, confidential, recipient)
VALUES
-- Climate Program comments
(1, 'test2', 'Excellent initiative! We need more ambitious targets for 2030.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, 0, 0, NULL),
(1, 'moderator', 'The proposed CO2 reduction targets align with EU standards.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*15, 0, 0, NULL),
(11, 'test3', 'Solar energy should be a priority in this expansion plan.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*12, 0, 0, NULL),
(11, 'admin', 'We have allocated 2.5B CHF for solar and wind projects.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, 0, 0, NULL),
(12, 'test', 'The budget allocation needs more transparency.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*8, 0, 0, NULL),

-- Digital Program comments
(14, 'test2', 'Digital ID should be optional, not mandatory.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, 0, 0, NULL),
(14, 'admin', 'The system will be optional with opt-in consent.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, 0, 0, NULL),
(15, 'test3', 'AI regulation must include transparency requirements.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*15, 0, 0, NULL),
(16, 'test', 'Great to see public API access!', EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, 0, 0, NULL),

-- Health Program comments
(17, 'test2', 'Mental health services are underfunded in rural areas.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, 0, 0, NULL),
(17, 'moderator', 'The strategy includes specific measures for rural regions.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, 0, 0, NULL),

-- Geneva Assembly comments
(2, 'test3', 'The budget priorities should focus on education and transport.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*30, 0, 0, NULL),
(2, 'admin', 'Education and mobility are the top two priorities for 2026.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*28, 0, 0, NULL),
(19, 'test', 'New housing projects must include affordable units.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, 0, 0, NULL),
(19, 'test2', 'I support the mixed-use development approach.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*8, 0, 0, NULL),

-- Local Commune comments
(3, 'admin', 'The bike lane expansion will connect the city center to the suburbs.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*25, 0, 0, NULL),
(3, 'test', 'Protected lanes are essential for safety.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, 0, 0, NULL),
(20, 'test2', 'Pedestrian zones improve quality of life in city centers.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*15, 0, 0, NULL),

-- Sample inquiry comments
(5001, 'admin', 'Ce projet est essentiel pour la mobilité durable à Genève.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*185, 0, 0, NULL),
(5001, 'test3', 'Il faudrait aussi prévoir des stationnements sécurisés.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*180, 0, 0, NULL),
(5002, 'test2', 'Les commerçants de la vieille ville seront impactés.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*140, 0, 0, NULL),
(5002, 'admin', 'Des solutions de livraison alternatives sont à l''étude.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*135, 0, 0, NULL),
(5003, 'admin', 'Les écoles sont un excellent point de départ.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*90, 0, 0, NULL),
(5003, 'test', 'Quel est le budget prévu pour ce projet ?', EXTRACT(EPOCH FROM NOW())::bigint - 86400*88, 0, 0, NULL),
(5007, 'test', 'Excellent projet pour améliorer la qualité de l''air.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*33, 0, 0, NULL),
(5007, 'test2', 'Il faudrait privilégier des espèces adaptées au changement climatique.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*30, 0, 0, NULL),
(5013, 'test2', 'Le lac est déjà trop pollué par les bateaux à moteur.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, 0, 0, NULL),
(5013, 'admin', 'Une étude d''impact est en cours.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, 0, 0, NULL),
(5015, 'test', 'Les toitures végétalisées réduisent aussi les îlots de chaleur.', EXTRACT(EPOCH FROM NOW())::bigint - 86400*12, 0, 0, NULL),
(5015, 'test2', 'Quels bâtiments sont prioritaires ?', EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, 0, 0, NULL)
ON CONFLICT DO NOTHING;

-- =======================================================
-- 9. ADD SUPPORTS (oc_agora_supports) - using md5 for support_hash
-- =======================================================

-- Supports for inquiry 5001 (binary - yes/no)
INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, support_hash, created, updated, weight, support_engine_id)
VALUES
(5001, 0, 'test2', '{"value": 1}', md5('5001_0_test2_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*185, EXTRACT(EPOCH FROM NOW())::bigint - 86400*185, 1, NULL),
(5001, 0, 'admin', '{"value": 1}', md5('5001_0_admin_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*180, EXTRACT(EPOCH FROM NOW())::bigint - 86400*180, 1, NULL),
(5001, 0, 'test3', '{"value": 0}', md5('5001_0_test3_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*178, EXTRACT(EPOCH FROM NOW())::bigint - 86400*178, 1, NULL)
ON CONFLICT DO NOTHING;

-- Supports for inquiry 5002 (reaction)
INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, support_hash, created, updated, weight, support_engine_id)
VALUES
(5002, 0, 'test', '{"reaction": "👍"}', md5('5002_0_test_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*140, EXTRACT(EPOCH FROM NOW())::bigint - 86400*140, 1, NULL),
(5002, 0, 'test2', '{"reaction": "🤔"}', md5('5002_0_test2_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*138, EXTRACT(EPOCH FROM NOW())::bigint - 86400*138, 1, NULL)
ON CONFLICT DO NOTHING;

-- Supports for inquiry 5003 (score)
INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, support_hash, created, updated, weight, support_engine_id)
VALUES
(5003, 0, 'test', '{"value": 9}', md5('5003_0_test_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*90, EXTRACT(EPOCH FROM NOW())::bigint - 86400*90, 1, NULL),
(5003, 0, 'admin', '{"value": 10}', md5('5003_0_admin_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*88, EXTRACT(EPOCH FROM NOW())::bigint - 86400*88, 1, NULL),
(5003, 0, 'test2', '{"value": 7}', md5('5003_0_test2_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*85, EXTRACT(EPOCH FROM NOW())::bigint - 86400*85, 1, NULL)
ON CONFLICT DO NOTHING;

-- Supports for inquiry 5004 (binary)
INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, support_hash, created, updated, weight, support_engine_id)
VALUES
(5004, 0, 'test2', '{"value": 1}', md5('5004_0_test2_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*75, EXTRACT(EPOCH FROM NOW())::bigint - 86400*75, 1, NULL),
(5004, 0, 'admin', '{"value": 1}', md5('5004_0_admin_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*70, EXTRACT(EPOCH FROM NOW())::bigint - 86400*70, 1, NULL)
ON CONFLICT DO NOTHING;

-- Supports for inquiry 5007 (binary)
INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, support_hash, created, updated, weight, support_engine_id)
VALUES
(5007, 0, 'test', '{"value": 1}', md5('5007_0_test_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*33, EXTRACT(EPOCH FROM NOW())::bigint - 86400*33, 1, NULL),
(5007, 0, 'test2', '{"value": 1}', md5('5007_0_test2_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*30, EXTRACT(EPOCH FROM NOW())::bigint - 86400*30, 1, NULL)
ON CONFLICT DO NOTHING;

-- Supports for inquiry 5009 (score - star rating 1-5)
INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, support_hash, created, updated, weight, support_engine_id)
VALUES
(5009, 0, 'test2', '{"value": 5}', md5('5009_0_test2_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*25, EXTRACT(EPOCH FROM NOW())::bigint - 86400*25, 1, NULL),
(5009, 0, 'admin', '{"value": 4}', md5('5009_0_admin_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*23, EXTRACT(EPOCH FROM NOW())::bigint - 86400*23, 1, NULL)
ON CONFLICT DO NOTHING;

-- Supports for inquiry 5013 (binary)
INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, support_hash, created, updated, weight, support_engine_id)
VALUES
(5013, 0, 'test', '{"value": 1}', md5('5013_0_test_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, 1, NULL),
(5013, 0, 'admin', '{"value": 1}', md5('5013_0_admin_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, 1, NULL)
ON CONFLICT DO NOTHING;

-- Supports for inquiry 5015 (score - star rating 1-5)
INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, support_hash, created, updated, weight, support_engine_id)
VALUES
(5015, 0, 'test', '{"value": 5}', md5('5015_0_test_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*12, EXTRACT(EPOCH FROM NOW())::bigint - 86400*12, 1, NULL),
(5015, 0, 'test2', '{"value": 4}', md5('5015_0_test2_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, 1, NULL),
(5015, 0, 'admin', '{"value": 5}', md5('5015_0_admin_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*8, EXTRACT(EPOCH FROM NOW())::bigint - 86400*8, 1, NULL)
ON CONFLICT DO NOTHING;

-- Supports for inquiry 5014 (binary)
INSERT INTO oc_agora_supports (inquiry_id, option_id, user_id, value, support_hash, created, updated, weight, support_engine_id)
VALUES
(5014, 0, 'test', '{"value": 1}', md5('5014_0_test_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, EXTRACT(EPOCH FROM NOW())::bigint - 86400*18, 1, NULL),
(5014, 0, 'test2', '{"value": 0}', md5('5014_0_test2_' || EXTRACT(EPOCH FROM NOW())::bigint), EXTRACT(EPOCH FROM NOW())::bigint - 86400*16, EXTRACT(EPOCH FROM NOW())::bigint - 86400*16, 1, NULL)
ON CONFLICT DO NOTHING;

-- =======================================================
-- 10. ADD ADDITIONAL INQUIRIES FOR TESTING
-- =======================================================

-- Additional inquiry for Citizen Jury (55) - using majority_judgment
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1001, NULL, 'deliberation', 'Climate Action: Citizen Jury Deliberation', 'Citizen jury deliberation on climate action policies for Switzerland 2030.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*30, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*60, 0, 'federal-citizens', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*5, NULL, 'accepted', 'active', 1, 'deliberative', 'majority_judgment'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1001);

-- Additional inquiry for Initiative Group (56) - using approval_delib
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1002, NULL, 'initiative', 'Geneva Green Roofs Initiative', 'Citizen initiative to require green roofs on all new buildings in Geneva.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*20, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*120, 0, 'geneva-citizens', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*3, NULL, 'accepted', 'active', 1, 'deliberative', 'approval_delib'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1002);

-- Additional inquiry for Ethics Review (57) - using none (no support)
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1003, NULL, 'official', 'Ethics Review: Bern Administrative Conduct', 'Official ethics review of administrative conduct in Bern.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*15, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*90, 0, 'bern-ethics', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*2, NULL, 'accepted', 'active', 1, 'official', 'none'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1003);

-- Additional inquiry for Consultation Set (58) - using ternary
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1004, NULL, 'consultation', 'Mental Health Prevention Consultation', 'Public consultation on mental health prevention programs for 2026-2030.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*10, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*45, 0, 'federal-health', 'everyone', 'published', 'after_vote', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 1, 'collective', 'ternary'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1004);

-- Additional inquiry for Assembly (59) - using binary
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1005, NULL, 'assembly', 'Zürich Cantonal Assembly: Education Reform', 'Assembly debate on education reform in Zürich canton.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*8, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*30, 0, 'zurich-residents', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 1, 'collective', 'binary'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1005);

-- Additional inquiry for Bundle (60) - using reaction
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1006, NULL, 'proposal', 'AI Governance Framework for Zürich', 'Proposal for AI governance and regulation in Zürich public services.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*5, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*180, 0, 'zurich-digital', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 1, 'deliberative', 'reaction'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1006);

-- Additional inquiry for Poll Group (61) - using score
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1007, NULL, 'poll', 'Geneva Mobility Preferences Poll', 'Public poll on mobility preferences in Geneva for 2026 budget planning.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*3, 0, EXTRACT(EPOCH FROM NOW())::bigint + 86400*30, 0, 'geneva-residents', 'everyone', 'published', 'after_vote', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'active', 1, 'collective', 'score'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1007);

-- Additional inquiry for Municipal Reports (62) - using none
INSERT INTO oc_agora_inquiries (id, cover_id, type, title, description, location_id, category_id, owner, created, archived, expire, deleted, owned_group, visibility, publication_status, show_results, last_interaction, parent_id, moderation_status, inquiry_status, allow_comment, family, support_feature)
SELECT 
    1008, NULL, 'report', 'Bern Municipal Report 2025: Infrastructure', 'Annual municipal report on infrastructure projects in Bern.', 0, 0, 'admin', EXTRACT(EPOCH FROM NOW())::bigint - 86400*2, 0, 0, 0, 'bern-government', 'everyone', 'published', 'always', EXTRACT(EPOCH FROM NOW())::bigint - 86400*1, NULL, 'accepted', 'published', 1, 'official', 'none'
WHERE NOT EXISTS (SELECT 1 FROM oc_agora_inquiries WHERE id = 1008);

-- =======================================================
-- 11. ADD GROUP-INQUIRY RELATIONSHIPS FOR NEW INQUIRIES
-- =======================================================

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1001, 55 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1001 AND group_id = 55);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1002, 56 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1002 AND group_id = 56);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1003, 57 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1003 AND group_id = 57);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1004, 58 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1004 AND group_id = 58);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1005, 59 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1005 AND group_id = 59);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1006, 60 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1006 AND group_id = 60);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1007, 61 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1007 AND group_id = 61);

INSERT INTO oc_agora_groups_inquiries (inquiry_id, group_id)
SELECT 1008, 62 WHERE NOT EXISTS (SELECT 1 FROM oc_agora_groups_inquiries WHERE inquiry_id = 1008 AND group_id = 62);

-- =======================================================
-- 12. ADD MISC DATA FOR NEW INQUIRIES
-- =======================================================

INSERT INTO oc_agora_inq_misc (inquiry_id, key, value) VALUES
(1001, 'meeting_date', '2026-09-15'),
(1001, 'meeting_time', '10:00'),
(1001, 'meeting_location', 'Bern Federal Building'),
(1001, 'facilitator', 'Dr. Anna Weber'),
(1001, 'layout_zone', 'main'),
(1001, 'render_mode', 'full'),
(1001, 'grades', '["Reject","Insufficient","Passable","Fairly_Good","Good","Very_Good","Excellent"]'),

(1002, 'layout_zone', 'sidebar'),
(1002, 'render_mode', 'summary'),
(1002, 'initiative_scope', 'municipal'),
(1002, 'quorum', '5000'),
(1002, 'min_choices', '1'),
(1002, 'max_choices', '3'),

(1003, 'layout_zone', 'main'),
(1003, 'render_mode', 'full'),
(1003, 'official_reference', 'BE-2025-045'),

(1004, 'consultation_start', '2026-08-01'),
(1004, 'consultation_end', '2026-10-31'),
(1004, 'layout_zone', 'sidebar'),
(1004, 'render_mode', 'summary'),
(1004, 'allow_abstain', 'true'),

(1005, 'meeting_date', '2026-09-20'),
(1005, 'meeting_time', '14:00'),
(1005, 'meeting_location', 'Kantonsrat Zürich'),
(1005, 'layout_zone', 'main'),
(1005, 'render_mode', 'cards'),
(1005, 'allow_abstain', 'false'),

(1006, 'layout_zone', 'sidebar'),
(1006, 'render_mode', 'summary'),
(1006, 'ai_governance_level', 'public'),
(1006, 'allowed_reactions', '["👍","❤️","🎉","🤔","👎"]'),
(1006, 'max_per_user', '3'),

(1007, 'voting_start', '2026-09-01'),
(1007, 'voting_end', '2026-09-30'),
(1007, 'poll_method', 'score'),
(1007, 'layout_zone', 'main'),
(1007, 'render_mode', 'cards'),
(1007, 'score_min', '0'),
(1007, 'score_max', '10'),
(1007, 'score_step', '1'),

(1008, 'report_year', '2025'),
(1008, 'report_department', 'Infrastructure'),
(1008, 'layout_zone', 'footer'),
(1008, 'render_mode', 'cards')
ON CONFLICT (inquiry_id, key) DO NOTHING;

-- ============================
-- Table: oc_agora_supports - REMOVED
-- Support data is now handled via the support engine system
-- ============================
