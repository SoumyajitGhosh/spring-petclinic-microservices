---
name: Spring PetClinic Microservices
description: A plain, sturdy admin console for the Spring Cloud microservices reference implementation.
colors:
  spring-green: "#6db33f"
  spring-dark-green: "#5fa134"
  bark-brown: "#34302d"
  spring-grey: "#838789"
  spring-light-grey: "#f1f1f1"
  signal-teal: "#075e54"
  signal-teal-hover: "#128c7e"
typography:
  headline:
    fontFamily: "montserratregular, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: "30px"
  title:
    fontFamily: "montserratregular, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: "24px"
  body:
    fontFamily: "varela_roundregular, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  label:
    fontFamily: "montserratregular, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "normal"
rounded:
  none: "0px"
  chatbox: "10px"
  bubble: "20px"
  pill: "50%"
spacing:
  sm: "10px"
  md: "20px"
  lg: "40px"
components:
  button-primary:
    backgroundColor: "{colors.bark-brown}"
    textColor: "{colors.spring-light-grey}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  button-primary-hover:
    backgroundColor: "{colors.bark-brown}"
  chatbox-button:
    backgroundColor: "{colors.signal-teal}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "10px"
  chatbox-button-hover:
    backgroundColor: "{colors.signal-teal-hover}"
---

# Design System: Spring PetClinic Microservices

## Overview

**Creative North Star: "The Spring Workbench"**

This is a tool for developers, and it looks like one. The visual system is plain, sturdy, and brand-loyal: official Spring green and a dark brown/black text-and-chrome palette, laid over Bootstrap's default grid with every corner squared off (`border-radius-base: 0`). There is no attempt at glossy consumer-SaaS polish — the flatness is deliberate restraint, not an unfinished look. It exists to demonstrate a working microservices system clearly, not to sell anything.

The one deliberate departure is the GenAI chat widget: a floating, rounded, softly-shadowed panel styled after familiar messaging apps (WhatsApp-green teal header, pill-shaped bubbles and buttons). It reads as a distinct, warmer surface layered on top of the flat workbench underneath — the one place in the product where a visitor is having a conversation rather than operating a console.

**Key Characteristics:**
- Official Spring brand green (`#6db33f`) used sparingly, as an accent and active/hover signal, never as a large fill.
- Square corners everywhere except the one conversational surface.
- No shadows on the admin chrome; the chat widget is the sole elevated layer.
- Montserrat for structural/headline text, Varela Round for body text — a utilitarian pairing, not a display-driven one.

## Colors

The palette is small and functional: one brand accent, one dark neutral for text and chrome, and an isolated secondary palette confined to the chat widget.

### Primary
- **Spring Green** (`#6db33f`): the Spring brand accent. Used for the navbar's top border, hover/active states on nav links and pagination, and the splash screen. Its rarity is the point — it marks interaction and brand, not decoration.

### Secondary (chat widget only)
- **Signal Teal** (`#075e54`): the chatbox header background and send-button fill — isolated entirely to the GenAI chat surface, never used elsewhere.

### Neutral
- **Bark Brown** (`#34302d`): primary text color, navbar background, and primary button fill.
- **Spring Grey** (`#838789`): secondary nav link text.
- **Spring Light Grey** (`#f1f1f1`): page background and reversed (on-dark) text/link color in the navbar and table headers.

### Named Rules
**The One Accent Rule.** Spring Green appears only on hover/active states, borders, and brand marks — never as a large background fill. Its scarcity is what makes it read as "brand," not "background."

**The Contained Palette Rule.** Signal Teal and its chat-bubble companions (`#dcf8c6` user bubble, `#ffffff` bot bubble, `#e1e1e1` bubble border) exist only inside `.chatbox`. They never bleed into the admin chrome, and the admin chrome's brown/green palette never appears inside the chat widget.

## Typography

**Display/Headline Font:** Montserrat (`montserratregular`, with sans-serif fallback)
**Body Font:** Varela Round (`varela_roundregular`, with sans-serif fallback)

**Character:** A geometric, slightly condensed sans (Montserrat) for structural text against a rounder, friendlier sans (Varela Round) for body copy — utilitarian rather than expressive, chosen for legibility over personality.

### Hierarchy
- **Headline** (400, 24px, 30px line-height, Montserrat): page-level `h1` titles.
- **Title** (700, 18px, 24px line-height, Montserrat): section `h2` headings.
- **Body** (400, 16px, 24px line-height, Varela Round): default body text, paragraphs, form inputs.
- **Label** (400, 14px, Montserrat, uppercase): navbar links — uppercase transform, no letter-spacing token defined.

## Layout

Built on Bootstrap's default 12-column grid and container system; no custom breakpoint values beyond Bootstrap's own, with one project-specific responsive rule at `max-width: 768px` that collapses the navbar brand to a centered mobile logo. Page content sits in a `.xd-container` with generous top/bottom margin (40px/100px on desktop, tightened to 20px/30px on mobile) — a workbench with room to breathe, not a dense dashboard.

## Elevation & Depth

Flat by default. The admin chrome — navbar, tables, buttons, forms — carries no shadows at all; surfaces sit directly on the page background with no simulated depth. The single exception is the GenAI chat widget, fixed to the bottom-right corner with a soft ambient shadow (`box-shadow: 0px 0px 10px rgba(0,0,0,0.1)`), marking it as a floating layer distinct from the page underneath.

### Shadow Vocabulary
- **Chat float** (`box-shadow: 0px 0px 10px rgba(0,0,0,0.1)`): the only shadow in the system. Applied exclusively to `.chatbox` to signal it floats above the page.

### Named Rules
**The Flat-Except-Chat Rule.** Every surface is flat at rest. The one shadow in the entire system exists solely to separate the floating chat widget from the console beneath it — do not add shadows anywhere else.

## Shapes

Square by default: `border-radius-base`, `-large`, and `-small` are all overridden to `0`, so buttons, tables, panels, and form controls have hard corners throughout the admin chrome. The chat widget is the deliberate exception, using fully rounded geometry — a 10px-radius container, 20px-radius message bubbles (with one flattened corner on each side to point toward its sender), and fully circular (`50%`) send button.

### Named Rules
**The Square Console, Round Conversation Rule.** Corner radius is a mode signal: `0` means "you are operating the console," rounded means "you are in a conversation." Never mix the two within the same surface.

## Components

### Buttons
- **Shape:** square (`0px` radius), consistent with the console-wide flat geometry.
- **Primary:** Bark Brown background, Spring Light Grey text, 2px Spring Green border, `6px 12px` padding.
- **Hover / Focus:** border transitions to Bark Brown (border "disappears" into the fill) over `0.15s`.

### Chat Widget (signature component)
- **Container:** fixed bottom-right, 300px wide, `10px` radius, ambient shadow, Spring Light Grey background.
- **Header:** Signal Teal background, white centered text, rounded top corners matching the container, clickable to minimize.
- **Message bubbles:** `20px` radius with one corner flattened toward the sender (bottom-right for user, bottom-left for bot); user bubbles in light green (`#dcf8c6`), bot bubbles white with a `1px` light-grey border.
- **Send button:** fully circular (`50%`), Signal Teal fill, lightens to `#128c7e` on hover.
- **Input field:** `20px`-radius pill, `1px` light-grey border, no visible focus ring defined.

### Tables
- **Header row:** Bark Brown background (3% lightened), Spring Light Grey text — a reversed-contrast band that anchors each table.
- **Borders:** Bark Brown border color throughout, square corners.

### Navigation
- **Style:** Bark Brown background with a 4px Spring Green top border as the sole brand mark.
- **Links:** Spring Light Grey text, uppercase, Montserrat, `28px 20px` padding; hover/active state fills with Spring Green and lightens text to `#eeeeee`.
- **Mobile:** brand logo collapses to a centered, smaller mobile mark below `768px`; nav links stack under the standard Bootstrap collapse behavior.

## Do's and Don'ts

### Do:
- **Do** keep Spring Green reserved for accents, borders, and active/hover states — never a large fill.
- **Do** keep the chat widget's rounded, colorful language fully contained to `.chatbox`; it does not spread to the admin chrome.
- **Do** use Montserrat for headings/labels and Varela Round for body text; don't introduce a third typeface.

### Don't:
- **Don't** add shadows to admin-chrome surfaces (nav, tables, buttons, forms) — flatness is the system's default, not a gap to fill.
- **Don't** round the corners of console components (buttons, tables, panels) — `0px` radius is deliberate, not a missed detail.
- **Don't** introduce the chat widget's teal/bubble palette anywhere outside the chat widget itself.
