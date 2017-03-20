import { FormatException } from "../types/Exceptions";

export class Version {
    // properties 
    public major: number;
    public minor: number;
    public build: number;

    // constructor
    public constructor() {
        this.major = 0;
        this.minor = 0;
        this.build = 0;
    }

    // public methods
    public getString() {
        return `${this.major}.${this.minor}.${this.build}`;
    }
    public incrementBuild(): Version {
        return Version.new(this.major, this.minor, this.build++);
    }
    public incrementMinor(): Version {
        return Version.new(this.major, this.minor++, this.build);
    }
    public incrementMajor(): Version {
        return Version.new(this.major++, this.minor, this.build);
    }

    // Operators
    public isEqual(to: Version): Boolean {
        return this.major == to.major && this.minor == to.minor && this.build == to.build;
    }
    public compare(to: Version): Number {
        if (this.major > to.major) {
            return 1;
        }
        else if (this.major < this.major) {
            return -1;
        }
        else { //(this.major == to.major)
            if (this.minor > to.minor) {
                return 1;
            }
            else if (this.minor < this.minor) {
                return -1;
            }
            else { //(this.minor == to.minor)
                if (this.build > to.build)
                    return 1;
                else if (this.build < this.build)
                    return -1;
                else { //(this.build == to.build)
                    return 0;
                }
            }
        }
    }

    // static methods
    public static new(major: Number, minor: Number, build: Number): Version {
        return {
            major: major,
            minor: minor,
            build: build
        } as Version;
    }
    public static parse(value: string): Version {
        let split = value.split(".");
        if (split.length != 3) {
            throw new FormatException(`format ${value} error: has to be "X.X.X"`);
        }

        return Version.new(
            parseInt(split[0]),
            parseInt(split[1]),
            parseInt(split[2])
        );
    }
    public static tryParse(value: string): Boolean {
        try {
            Version.parse(value);
            return true;
        }
        catch (error) {
            return false;
        }
    }
}