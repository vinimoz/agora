# Agora Template System

## Overview

The Agora template system allows administrators to load custom configuration data from JSON templates containing embedded multi-language translations. When loading a template, the admin selects ONE language, and only that language's text is stored in the database.

## Key Features

- **Embedded multi-language translations**: Templates contain all labels/descriptions in multiple languages within the JSON
- **Single language selection at import**: Admin chooses one language when loading the template
- **Direct text storage**: Selected language text is stored directly in the database (no i18n keys)
- **Template portability**: Easy to share and customize templates with your own terminology
- **Multiple use cases**: Support for citizen participation, enterprise, education, nonprofits, and more

## How It Works

1. **Template contains embedded translations**:
   ```json
   {
     "label": {
       "en": "Proposal",
       "fr": "Proposition",
       "de": "Vorschlag"
     }
   }
   ```

2. **Admin selects a language** when running the import command

3. **Text is extracted and stored** in the database:
   - If admin selects "fr", the label "Proposition" is stored
   - If admin selects "de", the label "Vorschlag" is stored

4. **Frontend displays the imported text** as-is (no translation lookup needed)

## Template Structure

A template JSON file consists of the following sections:

### template_info (required)
Basic metadata about the template:
```json
{
  "template_info": {
    "name": "template_name",
    "version": "1.0.0",
    "description": "Template description",
    "author": "Author name",
    "use_case": "citizen_participation",
    "available_languages": ["en", "fr", "de"]
  }
}
```

### inquiry_families (optional)
Define inquiry family types with multi-language labels:
```json
{
  "inquiry_families": [
    {
      "family_type": "deliberative",
      "label": {
        "en": "Deliberative",
        "fr": "Délibératif",
        "de": "Beratend"
      },
      "description": {
        "en": "Citizen-driven processes...",
        "fr": "Processus citoyens...",
        "de": "Bürgergetriebene Prozesse..."
      },
      "icon": "AccountGroup",
      "sort_order": 1
    }
  ]
}
```

### inquiry_types (optional)
Define specific inquiry types:
```json
{
  "inquiry_types": [
    {
      "inquiry_type": "proposal",
      "family": "deliberative",
      "icon": "LightbulbOn",
      "label": {
        "en": "Proposal",
        "fr": "Proposition",
        "de": "Vorschlag"
      },
      "description": {
        "en": "A proposal for improving...",
        "fr": "Une proposition pour améliorer...",
        "de": "Ein Vorschlag zur Verbesserung..."
      },
      "is_root": true,
      "allowed_response": ["suggestion", "objection"]
    }
  ]
}
```

### inquiry_statuses (optional)
Define status workflows for inquiry types:
```json
{
  "inquiry_statuses": [
    {
      "inquiry_type": "proposal",
      "status_key": "draft",
      "label": {
        "en": "Draft",
        "fr": "Brouillon",
        "de": "Entwurf"
      },
      "description": {
        "en": "Work in progress...",
        "fr": "Travail en cours...",
        "de": "In Arbeit..."
      },
      "is_final": false,
      "icon": "FileDocumentEdit",
      "sort_order": 1
    }
  ]
}
```

### option_types (optional)
Define option types for different inquiry families:
```json
{
  "option_types": [
    {
      "family": "debate",
      "option_type": "debate_for",
      "icon": "ThumbUp",
      "label": {
        "en": "For",
        "fr": "Pour",
        "de": "Dafür"
      },
      "description": {
        "en": "Argument in favour...",
        "fr": "Argument en faveur...",
        "de": "Argument für..."
      },
      "allowed_response": ["suggestion", "proposal"]
    }
  ]
}
```

### inquiry_group_types (optional)
Define how inquiries can be grouped:
```json
{
  "inquiry_group_types": [
    {
      "group_type": "theme",
      "label": {
        "en": "Theme",
        "fr": "Thème",
        "de": "Thema"
      },
      "description": {
        "en": "Group inquiries by theme...",
        "fr": "Regrouper les demandes...",
        "de": "Anfragen nach Thema..."
      },
      "icon": "Tag",
      "sort_order": 1
    }
  ]
}
```

### categories (optional)
Define categorization options:
```json
{
  "categories": [
    {
      "category_key": "urban_planning",
      "label": {
        "en": "Urban Planning",
        "fr": "Urbanisme",
        "de": "Stadtplanung"
      },
      "description": {
        "en": "Urban development...",
        "fr": "Développement urbain...",
        "de": "Stadtentwicklung..."
      },
      "sort_order": 1
    }
  ]
}
```

### locations (optional)
Define location options:
```json
{
  "locations": [
    {
      "location_key": "city_center",
      "label": {
        "en": "City Centre",
        "fr": "Centre-ville",
        "de": "Stadtzentrum"
      },
      "description": {
        "en": "Central area...",
        "fr": "Zone centrale...",
        "de": "Zentraler Bereich..."
      },
      "sort_order": 1
    }
  ]
}
```

## Usage

### 1. Browse Available Templates

View all available templates in the catalog:

```bash
occ agora:db:load-template --list
```

This will display detailed information about each template including:
- Template name, version, and author
- Description and use case
- Available languages
- Content summary (number of families, types, statuses, categories, etc.)

### 2. Clean Instance (Optional but Recommended)

Before loading a new template, clean the existing configuration:

```bash
occ agora:db:clean-instance
```

This removes all existing data including user-created content, configuration data, and support tables.

**Warning**: This operation cannot be undone! Make a backup first.

### 3. Load a Template

#### Load the default template with interactive language selection:
```bash
occ agora:db:load-template --default
```
You will be prompted to choose from available languages (en, fr, de).

#### Load the default template with a specific language:
```bash
occ agora:db:load-template --default --language=fr
```

#### Load a custom template:
```bash
occ agora:db:load-template /path/to/your/template.json --language=en
```

### 4. Verify the Results

The command will output detailed information about:
- Template name and description
- Selected language
- Which sections were loaded
- How many items were created in each section
- Any errors or warnings encountered

Example output:
```
Loading template from: /path/to/template.json
Selected language: fr

Loading template: default_citizen_participation
Description: Default template for citizen participation with multi-language support
Language: fr
Loading inquiry families...
  - Created family: deliberative
  - Created family: legislative
Loading inquiry types...
  - Created type: proposal
  - Created type: debate
...
Template loaded successfully!
All configuration data has been imported in fr.
```

## Language Handling

### Multi-Language Fields

Every user-facing text field (label, description) should be an object mapping language codes to translations:

```json
{
  "label": {
    "en": "English text",
    "fr": "Texte français",
    "de": "Deutscher Text",
    "es": "Texto español"
  }
}
```

### Language Codes

Use ISO 639-1 two-letter language codes:
- `en` - English
- `fr` - French
- `de` - German
- `es` - Spanish
- `it` - Italian
- `pt` - Portuguese
- `nl` - Dutch
- etc.

For regional variants, you can use:
- `en-US` - American English
- `en-GB` - British English
- `fr-CA` - Canadian French
- `gsw` - Swiss German

### Fallback Behavior

If a requested language is not available in a field, the system falls back to:
1. English (`en`) if available
2. The first available language
3. Empty string if no languages are defined

### Localized Enum Values

For user-facing enum fields (e.g., priority, category selectors), you can provide localized labels for each enum value. This ensures users see translated labels instead of raw identifiers like `"low"` or `"critical"`.

**Simple enum (technical values, not user-facing):**
```json
{
  "key": "layout_zone",
  "type": "enum",
  "allowed_values": ["sidebar", "main", "footer", "header"]
}
```

**Localized enum (user-facing values):**
```json
{
  "key": "priority",
  "label": {
    "en": "Priority",
    "de": "Priorität"
  },
  "type": "enum",
  "required": true,
  "allowed_values": [
    {"value": "low", "label": {"en": "Low", "de": "Niedrig", "fr": "Basse"}},
    {"value": "medium", "label": {"en": "Medium", "de": "Mittel", "fr": "Moyenne"}},
    {"value": "high", "label": {"en": "High", "de": "Hoch", "fr": "Haute"}},
    {"value": "critical", "label": {"en": "Critical", "de": "Kritisch", "fr": "Critique"}}
  ]
}
```

When the template is loaded with a specific language:
- The `value` field is stored as the internal identifier (used in database/code)
- The `label` field is extracted for the selected language (shown to users)

**Example:** Loading with `--language=de` stores:
- Internal value: `"high"`
- Displayed label: `"Hoch"`

**When to use localized enums:**
- Priority selectors (low, medium, high, critical)
- Status types (pending, approved, rejected)
- Category types (public, internal, confidential)
- Any dropdown where users see and select values

**When to keep simple enums:**
- Technical configuration options (render_mode, layout_zone, open_mode)
- System identifiers that administrators configure

## Creating Custom Templates

### For Specific Use Cases

You can create templates for different organizational contexts:

- **Enterprise IT**: Help desk tickets, automation requests, service requests
- **Education**: Course proposals, student feedback, facility requests
- **Healthcare**: Patient feedback, improvement suggestions, facility issues
- **Nonprofit**: Project proposals, volunteer coordination, community feedback

### Template Design Guidelines

1. **Keep it focused**: Design templates for specific use cases
2. **Use clear naming**: Use descriptive `family_type`, `inquiry_type`, and `status_key` values
3. **Define workflows**: Create appropriate status progressions for each inquiry type
4. **Plan relationships**: Define which inquiry types can respond to others via `allowed_response`
5. **Provide complete translations**: Include all languages you want to support
6. **Test thoroughly**: Load templates in a test environment first

### Example: Creating a Simple Template

```json
{
  "template_info": {
    "name": "simple_feedback",
    "version": "1.0.0",
    "description": "Simple feedback collection template",
    "author": "Your Organization",
    "use_case": "feedback",
    "available_languages": ["en", "fr"]
  },
  "inquiry_families": [
    {
      "family_type": "feedback",
      "label": {
        "en": "Feedback",
        "fr": "Retour d'information"
      },
      "description": {
        "en": "Customer and employee feedback",
        "fr": "Retours clients et employés"
      },
      "icon": "CommentText",
      "sort_order": 1
    }
  ],
  "inquiry_types": [
    {
      "inquiry_type": "suggestion",
      "family": "feedback",
      "icon": "Lightbulb",
      "label": {
        "en": "Suggestion",
        "fr": "Suggestion"
      },
      "description": {
        "en": "Suggest an improvement",
        "fr": "Suggérer une amélioration"
      },
      "is_root": true,
      "allowed_response": []
    }
  ],
  "categories": [
    {
      "category_key": "product",
      "label": {
        "en": "Product",
        "fr": "Produit"
      },
      "sort_order": 1
    },
    {
      "category_key": "service",
      "label": {
        "en": "Service",
        "fr": "Service"
      },
      "sort_order": 2
    }
  ]
}
```

## Examples

See the included templates:
- `default_citizen_participation.json` - Default citizen participation template with en, fr, de translations

## Technical Details

### Template Loader Service

The `TemplateLoader` service (`lib/Service/TemplateLoader.php`) handles:
- JSON parsing and validation
- Language extraction from multi-language fields
- Entity creation and database insertion
- Error handling and reporting

The `extractText()` method extracts the appropriate language from field objects.

### Database Mappers

Templates use the following database mappers:
- `CategoryMapper`
- `InquiryFamilyMapper`
- `InquiryGroupTypeMapper`
- `InquiryOptionTypeMapper`
- `InquiryStatusMapper`
- `InquiryTypeMapper`
- `LocationMapper`

## Important Notes

### Single Language Per Instance

- Each Agora instance runs in ONE language (the one selected during template import)
- All users see the same labels/descriptions
- To change languages, you must clean the instance and reload the template with a different language
- This design prioritizes simplicity and template portability

### No Per-User Translation

Unlike the Nextcloud interface which supports per-user language preferences, Agora configuration data (families, types, categories, etc.) is displayed in the single language that was imported.

This approach was chosen because:
1. Custom templates can define their own terminology
2. Templates are portable and can be shared easily
3. No dependency on translation management systems like Transifex
4. Simpler architecture and maintenance

### Updating Translations

To update the language or translations:
1. Clean the instance: `occ agora:db:clean-instance`
2. Reload the template with the desired language: `occ agora:db:load-template --default --language=<code>`

**Warning**: This will delete all existing data!

## Troubleshooting

### Template won't load
- Verify JSON syntax is valid
- Check that all required fields are present
- Ensure `template_info` section exists
- Verify `available_languages` array is populated

### Language not available
- Check the `available_languages` array in template_info
- Verify all label/description objects contain the requested language
- Use `--language=en` as a safe fallback (most templates should include English)

### Labels showing in wrong language
- The language is selected once during import
- All subsequent users see the same language
- To change, clean the instance and reload with a different language

### Missing translations
- Check that all label/description fields are objects (not strings)
- Verify each object contains entries for all advertised languages
- The system will fallback to English or the first available language

## Future Enhancements

Planned improvements:
- Web-based wizard UI for template selection and language choice
- Template validation command
- Template export functionality from existing configuration
- AI-assisted template generation
- Template marketplace/repository

## Support

For issues, questions, or contributions:
- GitHub: https://github.com/vinimoz/agora
- Issues: https://github.com/vinimoz/agora/issues
