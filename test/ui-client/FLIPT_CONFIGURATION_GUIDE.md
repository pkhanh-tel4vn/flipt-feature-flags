# Flipt Configuration Guide: Domain-Based Button Colors

This guide explains how to configure Flipt UI to return different button colors based on the domain context.

## Overview

Your code passes `domain` in the context:

```typescript
useFliptVariant("button-color", "blue", "demo-user", {
  domain: "crm-phuongchau.tel4vn.com",
});
```

To make different domains get different colors, you need to configure:

1. **Segments** - Match domains
2. **Rules** - Link segments to variants
3. **Distributions** - Assign variants to rules

## Step-by-Step Configuration

### Step 1: Create the Flag with Variants

1. Go to **Flags** → Create Flag
2. **Flag Key**: `button-color`
3. **Flag Type**: Variant
4. **Namespace**: `tel4vn` (matching your config)
5. **Environment**: `Development` (matching your config)

6. **Add Variants**:
   - `blue` (default)
   - `green`
   - `red`
   - `purple`

### Step 2: Create Segments for Each Domain

For each domain you want to target, create a segment:

#### Segment 1: CRM Phuong Chau Domain

1. Go to **Segments** → Create Segment
2. **Segment Key**: `domain-crm-phuongchau`
3. **Segment Name**: "CRM Phuong Chau Domain"
4. **Add Constraint**:
   - **Property**: `domain`
   - **Operator**: `==` (equals)
   - **Value**: `crm-phuongchau.tel4vn.com`
   - **Type**: `STRING`

#### Segment 2: Another Domain (Example)

1. **Segment Key**: `domain-other-domain`
2. **Segment Name**: "Other Domain"
3. **Add Constraint**:
   - **Property**: `domain`
   - **Operator**: `==`
   - **Value**: `other-domain.tel4vn.com`
   - **Type**: `STRING`

### Step 3: Create Rules in the Flag

1. Go back to **Flags** → `button-color` → **Rules** tab
2. Create a rule for each domain:

#### Rule 1: CRM Phuong Chau (Green Button)

1. Click **Add Rule**
2. **Rule Name**: "CRM Phuong Chau - Green"
3. **Add Segment**: Select `domain-crm-phuongchau`
4. **Add Distribution**:
   - **Variant**: `green`
   - **Rollout**: `100%` (or adjust as needed)

#### Rule 2: Other Domain (Red Button)

1. Click **Add Rule**
2. **Rule Name**: "Other Domain - Red"
3. **Add Segment**: Select `domain-other-domain`
4. **Add Distribution**:
   - **Variant**: `red`
   - **Rollout**: `100%`

### Step 4: Set Default Variant

1. In the flag's **Rules** tab, scroll to **Default Distribution**
2. Set the default variant to `blue` (fallback for domains not matching any segment)
3. **Rollout**: `100%`

## Rule Evaluation Order

Flipt evaluates rules **top to bottom**. The first matching rule wins:

1. **Rule 1**: If `domain == "crm-phuongchau.tel4vn.com"` → return `green`
2. **Rule 2**: If `domain == "other-domain.tel4vn.com"` → return `red`
3. **Default**: Otherwise → return `blue`

## Example Configuration Summary

```
Flag: button-color
├── Variants: blue, green, red, purple
└── Rules:
    ├── Rule 1: domain-crm-phuongchau segment → green (100%)
    ├── Rule 2: domain-other-domain segment → red (100%)
    └── Default → blue (100%)
```

## Testing

After configuration:

1. Test with `domain: "crm-phuongchau.tel4vn.com"` → should return `green`
2. Test with `domain: "other-domain.tel4vn.com"` → should return `red`
3. Test with `domain: "unknown-domain.com"` → should return `blue` (default)

## Advanced: Multiple Domains in One Segment

If you want multiple domains to share the same color, use the `IN` operator:

1. Create a segment with constraint:
   - **Property**: `domain`
   - **Operator**: `IN`
   - **Value**: `crm-phuongchau.tel4vn.com,another-domain.com,third-domain.com`
   - **Type**: `STRING`

## Notes

- Make sure the **namespace** and **environment** in Flipt match your `FeatureFlag.tsx` config
- Context properties are case-sensitive
- You can reorder rules by dragging them (first match wins)
- Use rollout percentages for gradual rollouts (e.g., 50% green, 50% blue)
