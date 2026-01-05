import Link from "next/link";
import Image from "next/image";

import StackCards from "./StackCards";
import projectsData from "./projects.json";
const { projects10 } = projectsData;

export default function PortfolioStack() {
    return (
        <div className="mxd-section padding-stacked-section">
            <div className="mxd-container grid-container">
                {/* Block - Projects Stacking Cards #01 Start */}
                <div className="mxd-block mxd-grid-item no-margin">
                    <div className="content__block loading__fade">
                        <StackCards stackName="projects-stack" className="stack-wrapper">
                            {projects10.map((s) => (
                                <Link
                                    key={s.id}
                                    className="mxd-projects-stack__inner justify-between"
                                    href={`/project-details`}
                                >
                                    <div className="mxd-projects-stack__image">
                                        <Image
                                            alt="Project Preview"
                                            src={s.image}
                                            width={1920}
                                            height={1080}
                                        />
                                    </div>
                                    <div className="mxd-projects-stack__tags">
                                        {s.tags.map((t, i) => (
                                            <span
                                                key={i}
                                                className="tag tag-default tag-outline-permanent"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mxd-projects-stack__title no-margin">
                                        <h2 className="permanent-light">{s.title}</h2>
                                    </div>
                                </Link>
                            ))}
                        </StackCards>
                    </div>
                </div>
                {/* Block - Projects Stacking Cards #01 End */}
            </div>
        </div>
    );
}
