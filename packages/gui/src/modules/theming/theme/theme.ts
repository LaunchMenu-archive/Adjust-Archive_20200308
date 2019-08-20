import {CSSProperties} from "react";
import {ITheme} from "../_types/ITheme";
import {IThemeData} from "../themeSettings";
import {getIcon} from "./getIcon";
import {React} from "../../../React";
import {ExtendedObject} from "@adjust/core";
import {DeepPartial} from "@adjust/core/types";
import {createTheme, ITheme as FabricITheme} from "@uifabric/styling";

export class Theme implements ITheme {
    protected palette: IThemeData["palette"];
    protected customPalette: IThemeData["customPalette"];
    protected icons: IThemeData["icons"];
    protected spacing: IThemeData["spacing"];
    protected fontStyles: IThemeData["fontStyles"];
    protected shadows: IThemeData["shadows"];

    protected superThemes: Theme[];

    /**
     * Creates a theme object based on json data
     * @param theme The data to create the theme from
     * @param superThemes The themes that this theme got extended from
     */
    constructor(theme: IThemeData, superThemes: Theme[] = []) {
        this.palette = theme.palette;
        this.customPalette = theme.customPalette;
        this.icons = theme.icons;
        this.spacing = theme.spacing;
        this.fontStyles = theme.fontStyles;
        this.shadows = theme.shadows;

        this.superThemes = superThemes;
    }

    /** @override */
    public getColor(
        colorName: keyof IThemeData["palette"] | keyof IThemeData["customPalette"]
    ): string {
        for (var i = 0; i < 100; i++) {
            if (this.palette[colorName]) colorName = this.palette[colorName];
            else if (this.customPalette[colorName])
                colorName = this.customPalette[colorName];
            else return i == 0 ? undefined : colorName;
        }
    }

    /** @override */
    public getIcon(icon: string): React.ComponentClass | React.FunctionComponent {
        for (var i = 0; i < 100; i++) {
            if (typeof icon == "string" && this.icons[icon])
                icon = this.icons[icon] as any;
            else return getIcon(icon);
        }
    }

    /** @override */
    public getSpacing(spacingName: keyof IThemeData["spacing"]): string | number {
        for (var i = 0; i < 100; i++) {
            if (this.spacing[spacingName]) spacingName = this.spacing[spacingName] as any;
            else return i == 0 ? undefined : spacingName;
        }
    }

    /** @override */
    public getFontStyle(styleName: keyof IThemeData["fontStyles"]): CSSProperties {
        for (var i = 0; i < 100; i++) {
            if (this.fontStyles[styleName]) styleName = this.fontStyles[styleName] as any;
            else return i == 0 ? undefined : (styleName as any);
        }
    }

    /** @override */
    public getShadow(shadowName: keyof IThemeData["shadows"]): string {
        for (var i = 0; i < 100; i++) {
            if (this.shadows[shadowName]) shadowName = this.shadows[shadowName] as any;
            else return i == 0 ? undefined : shadowName;
        }
    }

    // Augmentation methods
    /** @override */
    public extendTheme(data: DeepPartial<IThemeData>): ITheme {
        return new Theme(
            {
                palette: {...this.palette, ...data.palette},
                customPalette: {...this.customPalette, ...data.customPalette},
                icons: {...this.icons, ...data.icons},
                spacing: {...this.spacing, ...data.spacing},
                fontStyles: ExtendedObject.copyData(
                    data.fontStyles,
                    ExtendedObject.copyData(this.fontStyles, {})
                ) as any,
                shadows: {...this.shadows, ...data.shadows},
            },
            [...this.superThemes, this]
        );
    }

    /** @override */
    public getSuperThemeCount(): number {
        return this.superThemes.length;
    }

    /** @override */
    public getSuperTheme(index: number): ITheme {
        const count = this.getSuperThemeCount();
        index = ((index % count) + count) % count;
        return this.superThemes[index];
    }

    // Office ui fabric compatibility methods
    /** @override */
    public getFabricUItheme(): FabricITheme {
        return createTheme({
            defaultFontStyle: this.getFontStyle("medium"),
            palette: this.palette,
            fonts: this.fontStyles,
            spacing: {
                s2: this.spacing.xs,
                s1: this.spacing.s,
                m: this.spacing.m,
                l1: this.spacing.l,
                l2: this.spacing.xl,
            },
            effects: {
                elevation4: this.shadows.tiny,
                elevation8: this.shadows.small,
                elevation16: this.shadows.medium,
                elevation64: this.shadows.large,
            },
        } as any);
    }

    /** @override */
    public getFabricUIicons(): any {
        return {
            icons: ExtendedObject.map(this.icons, value =>
                React.createElement(this.getIcon(value))
            ),
        };
    }
}
