import os
import shutil
from fpdf import FPDF

# Define directories
WORKSPACE_DIR = r"c:\Users\HARISH KANNA\Align-All-Website"
RESOURCES_DIR = os.path.join(WORKSPACE_DIR, "resources")
IMAGE_DEST_DIR = os.path.join(RESOURCES_DIR, "images")
PDF_DEST_DIR = os.path.join(RESOURCES_DIR, "pdf")

# Ensure directories exist
os.makedirs(IMAGE_DEST_DIR, exist_ok=True)
os.makedirs(PDF_DEST_DIR, exist_ok=True)

class PremiumAlignAllPDF(FPDF):
    def __init__(self, document_title):
        super().__init__()
        self.document_title = document_title

    def header(self):
        # We don't want headers on the cover page (Page 1)
        if self.page_no() > 1:
            # Top brand bar
            self.set_fill_color(8, 12, 20)  # Dark background
            self.rect(0, 0, 210, 15, "F")
            self.set_text_color(56, 211, 213)  # Teal brand color
            self.set_font("helvetica", "B", 8)
            self.set_xy(10, 5)
            self.cell(0, 5, "ALIGN-ALL  |  DIGITAL DENTISTRY ACADEMY", align="R")
            self.ln(12)

    def footer(self):
        if self.page_no() > 1:
            self.set_y(-15)
            self.set_font("helvetica", "I", 8)
            self.set_text_color(150, 150, 150)
            self.cell(0, 10, f"Page {self.page_no()} | {self.document_title} | align-all.com", align="C")

    def cover_page(self, title, subtitle, image_filename):
        self.add_page()
        # Header banner on cover
        self.set_fill_color(8, 12, 20)
        self.rect(0, 0, 210, 45, "F")
        
        # Logo placeholder text
        self.set_text_color(255, 255, 255)
        self.set_font("helvetica", "B", 24)
        self.set_xy(20, 15)
        self.cell(0, 10, "Align-All")
        
        self.set_text_color(56, 211, 213)
        self.set_font("helvetica", "B", 10)
        self.set_xy(20, 25)
        self.cell(0, 10, "DIGITAL DENTISTRY ACADEMY")
        
        # Large Title
        self.set_text_color(8, 12, 20)
        self.set_font("helvetica", "B", 22)
        self.set_xy(20, 65)
        self.multi_cell(170, 10, title)
        
        # Subtitle
        self.set_text_color(123, 111, 232) # Purple
        self.set_font("helvetica", "B", 12)
        self.set_xy(20, 88)
        self.multi_cell(170, 6, subtitle)
        
        # Divider line
        self.set_draw_color(56, 211, 213)
        self.set_line_width(1.5)
        self.line(20, 105, 190, 105)
        
        # Cover image (centered, taking up most of bottom cover)
        img_path = os.path.join(IMAGE_DEST_DIR, image_filename)
        if os.path.exists(img_path):
            self.image(img_path, x=35, y=115, w=140, h=100)
            
        # Publisher details
        self.set_text_color(150, 150, 150)
        self.set_font("helvetica", "", 9)
        self.set_xy(20, 260)
        self.cell(0, 5, "Published by Align-All Precision Systems")
        self.set_xy(20, 265)
        self.cell(0, 5, "Official Clinical Reference Series -- August 2026")

    def page_header(self, title):
        self.set_font("helvetica", "B", 16)
        self.set_text_color(8, 12, 20)
        self.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT")
        
        # Teal separator line
        self.set_draw_color(56, 211, 213)
        self.set_line_width(0.5)
        self.line(self.get_x(), self.get_y(), 200, self.get_y())
        self.ln(6)

    def sub_section(self, title):
        self.set_font("helvetica", "B", 12)
        self.set_text_color(123, 111, 232)
        self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def paragraph(self, text):
        self.set_font("helvetica", "", 10.5)
        self.set_text_color(50, 50, 50)
        self.multi_cell(0, 6, text)
        self.ln(4)

    def callout_box(self, text):
        self.set_fill_color(245, 247, 250)
        self.set_draw_color(220, 224, 230)
        self.set_line_width(0.3)
        self.set_font("helvetica", "I", 9.5)
        self.set_text_color(80, 80, 80)
        self.multi_cell(0, 5.5, text, border=1, fill=True)
        self.ln(4)

# ==============================================================
# 1. BUILD PDF 1: BEGINNER'S GUIDE (5 PAGES)
# ==============================================================
pdf1 = PremiumAlignAllPDF("3D Printing in Dentistry - Beginners Guide")

# Page 1: Cover Page
pdf1.cover_page(
    "3D Printing in Dentistry",
    "A Comprehensive Beginner's Guide to Digital Additive Fabrication in Modern Clinics",
    "dental_3d_printer.png"
)

# Page 2: Chapter 1: The Digital Evolution
pdf1.add_page()
pdf1.page_header("Chapter 1: The Digital Evolution")
pdf1.paragraph("The integration of 3D printing in modern dentistry has revolutionized how dental clinics operate. Historically, creating restorative, orthodontic, and surgical models required using alginate, tray impressions, and physical plaster models. This manual workflow was messy, prone to dimensional distortions, and required large physical archive spaces to store client records.")
pdf1.paragraph("Digital dentistry replaces these traditional methods by capturing the patient's dentition digitally using an intraoral scanner. The resulting STL file represents a perfect, high-resolution mathematical model of the patient's mouth.")
pdf1.paragraph("3D printing acts as the bridge, turning these virtual CAD setups into highly accurate physical models in a matter of hours. The transition has significantly reduced delivery times, reduced material costs, and elevated clinical outcomes by guaranteeing micrometric precision.")
pdf1.callout_box("Clinical Insight: According to recent studies, digital intraoral scans and printed models have less than 50 microns of deviation, making them significantly more accurate than physical plaster casts which expand and warp over time.")

# Page 3: Chapter 2: Hardware Showcase & Mechanics
pdf1.add_page()
pdf1.page_header("Chapter 2: Hardware Showcase & Mechanics")
pdf1.paragraph("In a dental setting, three primary types of vat-polymerization 3D printing technologies are utilized. These technologies use ultraviolet (UV) light to selectively cure layers of liquid photopolymer resin.")
pdf1.sub_section("1. Stereolithography (SLA)")
pdf1.paragraph("SLA printers utilize a high-precision UV laser beam to draw the cross-section of each layer onto the vat. It is the most accurate printing method, yielding extremely smooth surfaces, which is critical for making premium clear aligner models.")
pdf1.sub_section("2. Direct Light Processing (DLP)")
pdf1.paragraph("DLP uses a digital projector screen to cure an entire layer simultaneously. Because the whole layer cures at once, print speed is significantly faster, making DLP optimal for high-throughput labs and busy offices.")
pdf1.sub_section("3. Liquid Crystal Display (LCD / MSLA)")
pdf1.paragraph("LCD printing uses an LCD screen to mask a UV LED light source. This offers high resolution at a lower hardware cost, making digital technology highly accessible to private dental clinics.")

# Page 4: Chapter 3: Step-by-Step Clinical Workflow
pdf1.add_page()
pdf1.page_header("Chapter 3: Step-by-Step Clinical Workflow")
pdf1.paragraph("To successfully incorporate 3D printing in your clinic, you must follow the standard 5-step digital loop. Skipping or rushing any of these steps will result in print failures or ill-fitting oral appliances.")
pdf1.sub_section("Step 1: Intraoral Scanning")
pdf1.paragraph("Use an intraoral scanner to capture the patient's teeth. Ensure the margins, palate, and occlusion are captured fully without voids.")
pdf1.sub_section("Step 2: CAD Design & Planning")
pdf1.paragraph("Import the STL scan into CAD software. Adjust teeth positions, model clear aligner steps, or construct surgical guide pathways.")
pdf1.sub_section("Step 3: Slicing & Preparation")
pdf1.paragraph("Import the solid model into slicing software. Orient the model at a 15 to 45 degree angle to reduce suction forces during the print cycle, and add support structures.")
pdf1.sub_section("Step 4: Printing")
pdf1.paragraph("Pour the appropriate biocompatible resin into the vat. Ensure the vat and build plate are completely clean before starting the print.")

# Page 5: Chapter 4: Post-Processing & Conclusion
pdf1.add_page()
pdf1.page_header("Chapter 4: Post-Processing & Conclusion")
pdf1.paragraph("Once the printer completes its cycle, the parts are only partially cured (known as the 'green state') and must go through a post-processing routine to reach their final strength and become fully biocompatible.")
pdf1.sub_section("Post-Processing Steps:")
pdf1.paragraph("1. Washing: Submerge the print in a bath of clean Isopropyl Alcohol (IPA) for 3-5 minutes to dissolve any uncured liquid resin on the surface. Do not over-soak, as resin absorbs alcohol and expands.\n"
               "2. Support Removal: Gently clip off the support struts using flush cutters. Smooth out any remaining support nubs.\n"
               "3. Post-Curing: Place the dry models inside a UV curing chamber for 5-15 minutes (following the resin manufacturer's settings). This final cure completes the chemical polymerization, rendering the appliance safe for oral use.")
pdf1.callout_box("Summary: 3D printing is no longer a luxury; it is the standard of care. By digitizing workflows, clinics save time and deliver a far superior experience for patients.")

pdf1.output(os.path.join(PDF_DEST_DIR, "Dental_3D_Printing_Beginners_Guide.pdf"))


# ==============================================================
# 2. BUILD PDF 2: 10 CLINICAL APPLICATIONS (5 PAGES)
# ==============================================================
pdf2 = PremiumAlignAllPDF("10 Clinical Applications of Dental 3D Printing")

# Page 1: Cover Page
pdf2.cover_page(
    "10 Clinical Applications",
    "A Comprehensive Guide to the Practical and Clinical Uses of 3D Printing in Dentistry",
    "dental_printed_models.png"
)

# Page 2: Chapter 1: The Versatile Dental Printer
pdf2.add_page()
pdf2.page_header("Chapter 1: The Versatile Dental Printer")
pdf2.paragraph("One of the greatest advantages of 3D printing is that a single hardware unit can produce a wide array of clinical devices. By simply switching the resin vat and material type, a dentist can transition from printing diagnostic models to printing surgical guides, biocompatible splints, or temporary crowns.")
pdf2.paragraph("This flexibility maximizes the return on investment (ROI) for the dental clinic, allows for immediate in-office modifications, and cuts out the shipping delays associated with traditional external dental laboratories.")
pdf2.paragraph("Below, we outline the first 4 of the top 10 most common clinical applications of 3D printing in modern practices:")
pdf2.sub_section("1. Diagnostic Study Models")
pdf2.paragraph("Printed using standard model resin. Allows clinicians to analyze patient bite alignment, explain treatment paths, and keep permanent physical records of cases.")
pdf2.sub_section("2. Clear Aligner Thermoforming Models")
pdf2.paragraph("Models printed from orthodontic planning software showing gradual tooth movement. Clear aligners (such as Align-All) are then thermoformed directly over these printed models.")

# Page 3: Chapter 2: Surgical and Splint Applications
pdf2.add_page()
pdf2.page_header("Chapter 2: Surgical & Splint Applications")
pdf2.paragraph("The use of 3D printing has dramatically improved safety and predictability in implantology and restorative dentistry. Here we look at applications 3 through 6:")
pdf2.sub_section("3. Surgical Drill Guides")
pdf2.paragraph("Printed using highly rigid, sterilizable, biocompatible resins. These guides slide over the patient's teeth during surgery and have metal sleeves that guide the implant drill at the precise angle and depth mapped in the CT scan.")
pdf2.sub_section("4. Indirect Bonding Trays (IBT)")
pdf2.paragraph("Printed using flexible biocompatible resins. Orthodontists place brackets into the slots of the printed tray, align the tray on the patient's teeth, and light-cure all brackets simultaneously, cutting appointment times in half.")
pdf2.sub_section("5. Occlusal Guards & Splints")
pdf2.paragraph("Printed from clear, high-impact biocompatible materials. Used to protect teeth in patients who suffer from bruxism (teeth grinding) and to alleviate TMJ joint disorders.")
pdf2.sub_section("6. Anatomical Maxillofacial Models")
pdf2.paragraph("Printed from CT scans to show complex bone fractures or impacted teeth. Allows surgeons to rehearse procedures and pre-bend plates before the patient enters the operating room.")

# Page 4: Chapter 3: Restorative and Prosthetic Applications
pdf2.add_page()
pdf2.page_header("Chapter 3: Restorative & Prosthetic Applications")
pdf2.paragraph("3D printing is now actively replacing traditional milling and casting methods for producing final oral prosthetics. We look at applications 7 through 10:")
pdf2.sub_section("7. Temporary Crowns & Bridges")
pdf2.paragraph("Printed with highly aesthetic, tooth-colored restorative resins. Placed directly in the mouth for short-term use while a permanent ceramic crown is milled.")
pdf2.sub_section("8. Custom Impression Trays")
pdf2.paragraph("Custom-shaped trays designed specifically for the patient's mouth. These are printed to ensure optimal tray fit and material thickness during final impression capture.")
pdf2.sub_section("9. Digital Full Dentures")
pdf2.paragraph("Printed in two parts: a pink gingiva-colored base and tooth-colored denture arches, which are then bonded together. This speeds up denture fitting and makes replacement simple.")
pdf2.sub_section("10. Castable Pressing Patterns")
pdf2.paragraph("Printed using zero-ash burnout resins. Used to create detailed patterns for pressing ceramic veneers or casting metal frameworks, bypassing manual waxing.")

# Page 5: Chapter 4: Clinical Summary & Benefits
pdf2.add_page()
pdf2.page_header("Chapter 4: Clinical Summary & Benefits")
pdf2.paragraph("By incorporating these applications into daily workflows, dental practices unlock several transformative benefits:")
pdf2.paragraph("- Reduced Treatment Cost: Raw resin printing costs a fraction of physical shipping and plaster cast storage.\n"
               "- Chairside Convenience: Make modifications and reprint models while the patient is still in treatment, reducing follow-up visits.\n"
               "- Customization: Custom orthodontic trays, splints, and guides fit the patient's anatomy perfectly, leading to higher comfort.\n"
               "- Seamless Records: All patient models are stored digitally as STL files, eliminating physical model cabinets.")
pdf2.callout_box("Future Outlook: As material science advances, direct printing of permanent ceramic crowns and shape-memory clear aligners will soon become standard, further reducing laboratory steps.")

pdf2.output(os.path.join(PDF_DEST_DIR, "10_Clinical_Applications_of_Dental_3D_Printing.pdf"))


# ==============================================================
# 3. BUILD PDF 3: WORKFLOW CHEATSHEET (5 PAGES)
# ==============================================================
pdf3 = PremiumAlignAllPDF("Digital Dentistry Workflow Cheatsheet")

# Page 1: Cover Page
pdf3.cover_page(
    "Digital Dentistry Workflow",
    "A Quick-Reference Cheatsheet and Checklist for Dental 3D Printing Workflows",
    "digital_dentistry_workflow.png"
)

# Page 2: Chapter 1: The Core Digital Workflow
pdf3.add_page()
pdf3.page_header("Chapter 1: The Core Digital Workflow")
pdf3.paragraph("To ensure maximum success and predictable results when printing clinical models, guides, and splints, you must master the fundamental digital loop.")
pdf3.paragraph("This cheatsheet serves as your clinic's quick-reference guide. Keep it in your lab or near your 3D printing station to verify settings and standard operating procedures (SOPs).")
pdf3.paragraph("Here is a quick look at the first two stages of the digital loop:")
pdf3.sub_section("1. Data Capture (Scan)")
pdf3.paragraph("Use an intraoral scanner to capture the patient's mouth. Ensure clear scan data around margins and check the occlusion alignment visually. Export files in STL or PLY format.")
pdf3.sub_section("2. Design (CAD)")
pdf3.paragraph("Import files into dental design software. Design the desired guide, splint, or teeth alignment model. Check boundary thicknesses (min 1.5mm for splints, 2.0mm for surgical guides) and export as solid STLs.")

# Page 3: Chapter 2: Build Preparation & Slicing
pdf3.add_page()
pdf3.page_header("Chapter 2: Build Preparation & Slicing")
pdf3.paragraph("Stage 3 of the loop is 'Slicing', where digital designs are prepared for the printer. Correct slicing settings are crucial to prevent print detachments.")
pdf3.sub_section("Slicing Setup Guide:")
pdf3.paragraph("1. Slicer Selection: Use the software recommended by your printer manufacturer (e.g., Chitubox, Formlabs PreForm, or Asiga Composer).\n"
               "2. Layer Height: Use 50-micron (0.05mm) layers for aligner models and splints. Use 100-micron layers for study models to print faster.\n"
               "3. Model Orientation: Tilt models at a 30 to 45 degree angle relative to the build platform. Printing flat causes excessive peel forces that break print layers.\n"
               "4. Support Struts: Generate automatic supports with a density of 50-60%. Place heavy supports on the base and light supports on critical margins to make removal clean.")
pdf3.callout_box("Rule of Thumb: Never place support tips directly on tooth margins or contact areas. Place them on non-critical regions like the palate or base.")

# Page 4: Chapter 3: Post-Processing Reference
pdf3.add_page()
pdf3.page_header("Chapter 3: Post-Processing Reference")
pdf3.paragraph("Post-processing (washing and curing) changes the printed liquid resin into a solid, safe, biocompatible dental device. Follow this strict guide:")
pdf3.sub_section("Washing Guidelines:")
pdf3.paragraph("- Alcohol Type: Use high-purity (99%+) Isopropyl Alcohol (IPA) or Glycol Ether (TPM).\n"
               "- Wash Time: Wash in an active wash tank for 3 to 5 minutes. Over-washing weakens the resin matrix.\n"
               "- Drying: Let the models completely air dry (or blow dry with compressed air) before curing. Curing wet resin causes white chalky deposits.")
pdf3.sub_section("Post-Curing Guidelines:")
pdf3.paragraph("- UV Curing Chamber: Always cure in a professional UV chamber with a rotating glass plate.\n"
               "- Temperature: Many medical-grade resins require heat (e.g. 60 deg C) during curing to maximize strength.\n"
               "- Curing Time: Cure for 5 to 15 minutes, rotating parts regularly. Fully cured parts will lose any sticky or soft feel.")

# Page 5: Chapter 4: Troubleshooting Checklist
pdf3.add_page()
pdf3.page_header("Chapter 4: Troubleshooting Checklist")
pdf3.paragraph("If your prints are failing, run through this quick troubleshooting checklist:")
pdf3.sub_section("Common Issues & Fixes:")
pdf3.paragraph("1. Print is separating from build plate: Re-calibrate the build plate level. Increase the 'Bottom Exposure Time' in your slicer settings to ensure the first layers stick firmly.\n"
               "2. Model has warped or fits poorly: Check your washing time. If washed too long in alcohol, parts will swell. Ensure complete post-curing to stabilize the shape.\n"
               "3. Cloudiness in print detail: Replace or clean the FEP film at the bottom of the resin vat. Clean the printer's optical glass cover panel.\n"
               "4. Parts break during support removal: Remove supports BEFORE post-curing when the resin is still slightly flexible (green state).")
pdf3.callout_box("For technical support or shape-memory aligner inquiries, visit align-all.com or contact Align-All Clinical Support directly.")

pdf3.output(os.path.join(PDF_DEST_DIR, "Digital_Dentistry_Workflow_Cheatsheet.pdf"))

print("All 3 clinical PDFs successfully generated with 5-page layouts!")
